const jwt = require("jsonwebtoken")
// This is not used.... 🛠
const { login } = require("../controllers/auth.controller")

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

module.exports = {
    verifyToken,
    checkRoles,
    login
}