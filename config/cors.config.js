const cors = require('cors');

// Define the origins that you want to allow
const allowedOrigins = [
  'http://localhost:3000', // Replace with your frontend URL
  // Add more origins as needed
];

// Set up CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = cors(corsOptions);