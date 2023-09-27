const jwt = require("jsonwebtoken")
// This is not used.... 🛠
// const { login } = require("../controllers/auth.controller")


function verifyToken(req, res, next) {
    // Get auth header value
    const token = req.headers["authorization"]

    try {
    // Check if token is undefined
    if(!token) throw "Access denied, no token provided"

    // Verify & Decode token
    const decoded = jwt.verify(token, process.env.SECRET_KEY)

    // Set user in the request object
    req.user = decoded

      // If all OK - proceed to next middleware(if any)
      return next()

        
    } catch (error) {
        return res.status(401).json({error: error})
    }

 
}

function checkRoles(roles) {

    return (req, res, next) => {
        console.log(req.user);
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({error: "Unauthorized"})
        }
        return next()
    }
}

// async function login(email, password) {
//     try {
//         // Client-side validation
//         if (!email || !password) {
//             throw new Error('Email and password are required.');
//         }

//         const options = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, password })
//         };

//         // Make a POST request to your authentication endpoint
//         const response = await fetch('http://localhost:8080/auth/login', options);

//         if (!response.ok) {
//             const data = await response.json();
//             throw new Error(data.message || 'Login failed.');
//         }

//         const data = await response.json();
//         const accessToken = data.accessToken;

//         // Save access token to local storage
//         localStorage.setItem('access_token', accessToken);

//         // Use the verifyToken middleware to decode and verify the token
//         const decodedToken = jwt.decode(accessToken);

//         if (decodedToken) {
//             // Set user information based on the decoded token
//             this.currentUser = {
//                 id: decodedToken.id,
//                 email: decodedToken.email,
//                 role: decodedToken.role // Assuming your token contains a "role" field
//             };

//             // Check the user's role and redirect accordingly
//             if (this.currentUser.role === 'spaceProvider') {
//                 // Redirect to the spaceProvider profile page
//                 router.push(`/profile/spaceProvider/${this.currentUser.id}`);
//             } else if (this.currentUser.role === 'spaceUser') {
//                 // Redirect to the spaceUser profile page
//                 router.push(`/profile/spaceUser/${this.currentUser.id}`);
//             }

//             this.userLoggedIn = true;
//             return this.currentUser.id;
//         }
//     } catch (error) {
//         router.push('/login');
//         console.error(error);
//     }
// }


module.exports = {
    verifyToken,
    checkRoles,
    // login
}