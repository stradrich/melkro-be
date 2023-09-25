const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')


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

router.post('/auth/register', async (req, res) => {
    try {
        await authController.register(req, res); // Call the register function
        // Do not send a response here
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });  
    }
});






router.post('/auth/login', authController.login)
router.post('/register', authController.register)
router.post('/verify', authController.verifyEmail)
router.post('/login', authController.login)


module.exports = router;