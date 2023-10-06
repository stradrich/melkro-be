const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { verifyToken } = require('../middlewares/auth.middleware')




// router.post('/register', async (req, res) => {
//     try {
//     await authController.register(req, res); // Call the register function
//     res.status(200).json({ message: "Registration successful"})     
//     } catch (error) {
//     res.status(500).json({ error: "Internal server error"})  
//     };
// })

// Define a mock user object
const mockUser = {
    id: 1,
    username: 'exampleuser',
    email: 'user@example.com',
  };
  
  // Define a route to get the current user
  router.get('/auth/current-user', (req, res) => {
    // Simulate a delay (e.g., 1 second) to mimic an async operation
    setTimeout(() => {
      res.json(mockUser);
    }, 1000);
  });

// router.post('/auth/register', async (req, res) => {
//     try {
//         await authController.register(req, res); // Call the register function
//         // Do not send a response here
        
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });  
//     }
// });


// Registration endpoint
router.post('/auth/register', async (req, res) => {
  try {
    await authController.register(req, res); // Call the register function from your auth controller
    // Do not send a response here, as the registration function in your controller should handle it
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
router.post('/auth/login', async (req, res) => {
  try {
    // Log request details
    logger.debug(`Received login request from ${req.ip}`);
    
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Client-side validation
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    // Make a POST request to your authentication endpoint
    const response = await fetch('http://localhost:8080/auth/login', options);

    if (!response.ok) {
      const data = await response.json();
      return res.status(response.status).json({ error: data.message || 'Login failed.' });
    }

    const data = await response.json();
    const accessToken = data.accessToken;

    // Save access token to local storage
    // Note: This is for demonstration purposes; in a real app, you might use secure cookies or other methods.
    // Also, ensure the security of the token storage.
    // localStorage.setItem('access_token', accessToken);

    // Use the verifyToken middleware to decode and verify the token
    const decodedToken = jwt.decode(accessToken);

    if (decodedToken) {
      // Set user information based on the decoded token
      const currentUser = {
        id: decodedToken.id,
        email: decodedToken.email,
        role: decodedToken.role // Assuming your token contains a "role" field
      };

      // Check the user's role and redirect accordingly
      if (currentUser.role === 'spaceProvider') {
        // Redirect to the spaceProvider profile page
        return res.status(200).json({ user: currentUser }); // Or you can redirect from the client-side
      } else if (currentUser.role === 'spaceUser') {
        // Redirect to the spaceUser profile page
        return res.status(200).json({ user: currentUser }); // Or you can redirect from the client-side
      }

      // Handle other roles if needed

      // Respond with the user object
      // res.status(200).json({ user: currentUser });
    } else {
      return res.status(500).json({ error: 'Access token is invalid' });
    }
  } catch (error) {
    // Handle errors
    logger.error('Error handling login request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

  




router.post('/auth/login', authController.login)
router.post('/register', authController.register)
router.post('/verify', authController.verifyEmail)
router.post('/login', authController.login)
router.post('/forgotPwd', authController.forgotPassword)
router.post('/resetPwd', authController.resetPassword)
router.post('/changePwd', verifyToken, authController.changePassword)


module.exports = router;