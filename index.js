const express = require("express");
const bodyParser = require('body-parser');
const { verifyToken, checkRoles } = require('./middlewares/auth.middleware')


const app = express();

const cors = require("cors")
const morgan = require("morgan")

if (typeof window === 'undefined') {
    // Load node-jose only in a server environment
    const jose = require('node-jose');
  }

// Load environment variables. See .env file for available variables.
// This should be done before loading variables from process.env
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
  });

  /* 
Morgan configuration that logs the following:
- the request body
- the request params
- the request query
- the time of the request
- the user agent
*/


// This configuration outputs a detailed log entry for each
// incoming request, including the request body, 
// URL parameters, query parameters, timestamp, and user agent. 
// This can be useful for diagnosing issues, monitoring traffic, 
// and understanding how clients are interacting with your server.

const morganConfig = morgan(function (token, req, res) {
    return [
        JSON.stringify(req.body),
        JSON.stringify(req.params),
        JSON.stringify(req.query),
        morgan.token('date', (req, res, format) => {
            return new Date().toISOString();
        }),
        req.headers["user-agent"],
    ].join("");
})

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morganConfig);
app.use(bodyParser.json());

const sequelize = require("./config/db.config.js")
sequelize.options.hooks = {};


// Define routes 
// HERE!!!!!
const authRoutes = require("./routes/auth.routes.js")
const bookingRoutes = require("./routes/booking.routes.js")
const listingRoutes = require("./routes/listing.routes.js")
const messagingRoutes = require("./routes/messaging.routes.js")
const paymentRoutes = require("./routes/payment.routes.js")
const RnRRoutes = require("./routes/RnR.routes.js")
const stripeRoutes = require("./routes/stripe.routes")
const timeslotRoutes = require("./routes/timeslot.routes.js")
const userRoutes = require("./routes/user.routes.js")
// const websocketRoutes = require("./routes/websocket.routes.js")



// I'm using plural for the routes...(hierarchy, higher you see more, lower you see less, authentication at play)
app.use("/auth", authRoutes)
app.use("/bookings", bookingRoutes)
app.use("/listings", listingRoutes)
// app.use("/messaging", messagingRoutes)
app.use("/payment", paymentRoutes)
app.use("/reviews-ratings", RnRRoutes)
app.use("/stripe", stripeRoutes)
app.use("/timeslot", timeslotRoutes)
app.use("/users", userRoutes)


// app.use("/websocket", websocketRoutes)

app.get("/music-space", (req, res) => {
    res.send("Welcome to music space API... 🎻 🎹 🎵 ")
})


// Health routes (Application monitoring, load balancing, automatic recovery & scaling, diagnostics & troubleshooting, third-party integration, transparent communication, customizable indicators)
// 1. Check environment, development/production/test
app.get('/', (req,res) => {
    res.send(`Environment: ${process.env.NODE_ENV} OK`)
})
// 2. Check database connection
// Example sync usage

// Sync models with database
sequelize.sync()
   .then(() => {
      console.log('🎉 Database synced successfully');
   })
   .catch((error) => {
      console.error('🤯 Error syncing database:', error, `Please check Docker and Beekeeper, ignore this if you've uploaded DB on digital ocean`);
   });

// 3. Check third-party service availability
// A. Stripe Payment
const stripe = require('stripe')(process.env.STRIPE_KEY);
app.get('/check-stripe', async (req, res) => {
    try {
        console.log("checkpoint 1");
        // Attempt to retrieve some data from Stripe to check its availability
        const paymentMethods = await stripe.paymentMethods.list({ limit: 1 });
        
        if (paymentMethods.data.length > 0) {
            console.log("checkpoint 2");
            return res.status(200).json({ message: 'Stripe service is available.' });
        } else {
            console.log("checkpoint 3");
            return res.status(500).json({ message: 'Stripe service is not responding as expected.' });
        }
    } catch (error) {
        console.log("checkpoint 4");
        console.error('Error checking Stripe service:', error);
        return res.status(500).json({ message: 'An error occurred while checking the Stripe service.' });
    }
});

// ... Other route definitions ...

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 8080');
});


// 4. Check dependencies 

// Start the server
const port = process.env.PORT || 8080;
// const port = process.env.PORT || 5174;
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log(" 🍾 Connection has been established successfully");
        console.log(`🚀 Server is running on port ${ port }`)
    } catch (error) {
        console.log(" 🧐 Unable to connect to the database:", error);
    }
});

