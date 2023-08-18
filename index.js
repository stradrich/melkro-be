const express = require("express");
const app = express();
const morgan = require("morgan")

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
        tokens.date(req, res, "iso"),
        req.headers["user-agent"],
    ].join("");
})

// Middlewares
app.use(express.json());
app.use(morganConfig);

const sequelize = require("./config/db.config.js")

// Define routes 
// HERE!!!!!
const authRoutes = require("./routes/auth.routes.js")
const bookingRoutes = require("./routes/booking.routes.js")
const listingRoutes = require("./routes/listing.routes.js")
const messagingRoutes = require("./routes/messaging.routes.js")
const paymentRoutes = require("./routes/payment.routes.js")
const RnRRoutes = require("./routes/RnR.routes.js")
const userRoutes = require("./routes/user.routes.js")

// I'm using plural for the routes...(hierarchy, higher you see more, lower you see less, authentication at play)
app.use("/auth", authRoutes)
app.use("/bookings", bookingRoutes)
app.use("/listings", listingRoutes)
app.use("/messaging", messagingRoutes)
app.use("/payment", paymentRoutes)
app.use("/reviews-ratings", RnRRoutes)
app.use("/users", userRoutes)


// Health routes (Application monitoring, load balancing, automatic recovery & scaling, diagnostics & troubleshooting, third-party integration, transparent communication, customizable indicators)
// 1. Check environment, development/production/test
app.get('/', (req,res) => {
    res.send(`Environment: ${process.env.NODE_ENV} OK`)
})
// 2. Check database connection
// 3. Check third-party service availability
// 4. Check dependencies 

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log(" 🍾 Connection has been established successfully");
        console.log(`🚀 Server is running on port ${PORT}`)
    } catch (error) {
        console.log(" 🧐 Unable to connect to the database:", error);
    }
});

