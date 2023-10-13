const jwt = require("jsonwebtoken");
// - Implement user model
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util.js")
// const { mg } = require("../utils/mailgun.util.js");



// - Implement user registration and authentication
async function register(req, res) {
    try {
      // Check if the user with the provided email already exists
      const userExist = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
  
      if (userExist) {
        // User with the same email already exists
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Create user using data from request body.
      // Request body must contain all required fields defined in User model.
      const hashedPassword = hashPassword(req.body.password);
      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });
  
      // Now that 'user' is defined, you can use it to create the tokenPayload
      const tokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
        password: user.password,
        // firstName: user.firstName,
        // lastName: user.lastName,
        // major: user.major
      };

      console.log(tokenPayload.name);
      const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      console.log('Registering a user...');
  
      // Uncomment the code below for sending a verification email
      /*
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
  
      // Email data
      const data = {
        from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        to: user.email,
        subject: "Verify Your Account",
        html: `
          Please click on this link to verify your account:
          <a href="https://${req.header('Host')}/auth/verify?token=${token}">Verify Account</a>
          <br>
          <p>This verification link expires in 1 hour</p>
        `,
      };
  
      // Send email to user with verification link
      await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
      */
  
      // If user received a verification link, another email will notify the backend
  
      // Send a success response with user and access token
      return res.status(201).json({
        // message: "Email verification link sent to user's email",
        user,
        accessToken,
      });
    } catch (error) {
      // Handle unexpected errors and send an error response
      console.error(error);
      return res.status(500).json({ error: error });
    }
  }
  
  async function verifyEmail(req, res) {
    try {
        // Get verification token from req body
        const { verificationToken } = req.body;
        console.log(verificationToken);

        if (!verificationToken) throw "Invalid verification token";

        // Verify & decode token & get user id 
        const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY);
        console.log(`decoded:`, decoded);

        const user = await User.findOne({
            where: {
                email: decoded.email
            }
        })

        // Update user to verified
        await User.update(
            {
                isVerified: true,
            },
            {
                where: {
                    email: decoded.email,
                },
            }
        );

        // Prepare email data
        const data = {
            from: "mailgun@" + process.env.MAILGUN_DOMAIN,
            to: user.email,
            subject: "Account Verified",
            html: `
                <h3>Your account is now verified</h3>
            `,
        };
        console.log("checkpoint 4");

        // Send email to user
        await mg.messages.create(process.env.MAILGUN_DOMAIN, data)

        // Send success message
        return res.send({
            message: "Account Verified",
        });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


// async function verifyEmail(req, res) {
//     try {
//     // Get verification token from req body
//     const { verificationToken } = req.body;
//     console.log(verificationToken);

//     if (!verificationToken) throw "Invalid verification token"

//     // Verify & decode token & get user id 
//     const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY)
//     console.log(`decoded:`, decoded);

//     const user = await User.findOne({
//         where: {
//             email: decoded.email
//         }
//     })

//     // Update user to verified
//     await User.update(
//         {
//             isVerified: true,
//         },
//         {
//             where: {
//                 email: decoded.email,
//             },
//         }
//     );
//     console.log("checkpoint 3");


//     // Prepare email data
//     const data = {
//         from: "mailgun@" + process.env.MAILGUN_DOMAIN,
//         to: user.email,
//         subject: "Account Verified",
//         html: `
//                 <h3>Your account is now verified</h3>
//             `,
//     };
//     console.log("checkpoint 4");

//     // Send email to user
//     await mg.messages.create(process.env.MAILGUN_DOMAIN, data)

//     // Send success message
//     return res.send({
//         message: "Account Verified",
//     });
//     } catch (error) {
//         return res.status(500).json({ error: error});
//     }
// }

async function getCurrentUser() {
    try {
        // Make a GET request to the backend to fetch the current user
        const response = await fetch('http://localhost:8080/auth/current-user');
        if (!response.ok) {
            throw new Error('Failed to fetch current user.');
        }
        const data = await response.json();
        console.log('getCurrentUser:', data)
        return data; // Assuming the user data is returned as JSON
    } catch (error) {
        console.error('Error fetching current user:', error);
        return null; // Return null or handle the error as needed
    }
}


// async function login(req, res) {
//     try {
//         // Get user input
//         const { email, password } = req.body;

//         // Validate user input
//         if (!email && password) {
//             // This will go to the catch block
//             throw "Email and password are required"
//         }

//         const user = await User.findAll({
//             where: {
//                 email: email
//             }
//         })

//         if (!user) throw `User doest not exist. Please sign up.`

//         // Validate if user password is correct
//         const matchingPwd = comparePassword(password, user.password);

//         if (!matchingPwd) throw "Invalid login credentials";

//         //  Generate JWT
//         const token = jwt.sign(
//             {id: user.id, email: user.email, role:user.role },
//             process.env.SECRET_KEY,
//             {
//                 // expiresIn: "2h",
//                 algorithm: "HS256",
//             }
//         );

//         res.status(200).json({ accessToken: token});
//     } catch (error) {
//         res.status(500).json({ error: error});
//     }
// }

// - implement user login
async function login(req, res) {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            // Use || here instead of &&
            throw "Email and password are required";
        }

        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            throw "User does not exist. Please sign up.";
        }

        // Validate if user password is correct
        const matchingPwd = comparePassword(password, user.password);

        if (!matchingPwd) {
            throw "Invalid login credentials";
        }

        //  Generate JWT
        const token = jwt.sign(
            {   id: user.user_id, 
                email: user.email, 
                role: user.role,
                username: user.username,
                password: user.password,
                // firstName: user.firstName,
                // lastName: user.lastName,
                // major: user.major
            },
            process.env.SECRET_KEY,
            {
                // expiresIn: "2h",
                algorithm: "HS256",
            }
        );

        return res.status(200).json({ accessToken: token });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

function verifyToken(req, res, next) {
    // Get auth header value
    const token = req.headers["authorization"]

    try {
        // Check if token is undefined
        if (!token) throw "No token provided"

        // Verify and decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        // Set user in the request object
        req.user = decoded

        // If all OK, proceed to next middleware (if any)
        return next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            // Token is invalid
            return res.status(401).json({ error: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            // Token has expired
            return res.status(401).json({ error: 'Token has expired' });
        } else {
            // Other errors
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // // If all OK, proceed to next middleware (if any)
    // return next()
}

function checkRole(roles) {

    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({error: "Unauthorized"})
        }

        return next()
    }
}

// User forgot password during login
async function forgotPassword(req, res) {
    try {
        // Get user email from request body
        const { email } = req.body

        if(!email) throw "Email is required"

        // Check if user exists 
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if(!user) throw "User does not exist"

        // Generate reset token
        const token = jwt.sign(
            {id: user.id},
            process.env.SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )

           // Log the decoded token for debugging
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            console.log('Decoded Token:', decodedToken);

        // Send email to the user with the reset token
        // const data = {
        //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        //     to: email,
        //     subject: "Reset Your Password",
        //     text: `Token to reset password: ${token}`
        // }
        
        // // Send email to user
        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data)

        // Send success response
        res.status(200).json({
            message: `Reset Password Success, check your linked email account to get reset password token, ${token}`
        })

    } catch (error) {
        res.status(500).json({error: error})
    }
}

// For user to reset password for forgetting password
async function resetPassword(req, res) {
    try {
        const { newPassword, resetToken } = req.body

        if(!newPassword) throw "New password is required"

        if(!resetToken) throw "Reset token is required"

        const decodedToken = jwt.verify(resetToken, process.env.SECRET_KEY)
        console.log('Decoded:', decodedToken);

        // Extract the user ID from the decoded token
        const userId = decodedToken.id;

         // Fetch the user by ID from the database
         const user = await User.findByPk(userId);

          // Check if the user exists in your database
        if (!user) {
            console.error('User not found in the database');
            return res.status(404).json({ error: 'User not found' });
        }

        const hashedPassword = hashPassword(newPassword);

        // Update user password in database
        await user.update(
            { 
                password: hashedPassword
            },
            // {
            //     where: {
            //         id: decoded.id
            //     }
            // }
        )

        // Send success response
        res.send("Password updated")
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({error: error})
    }
}

// User wants to update their own password on their own terms
async function changePassword(req, res) {
    try {
    
        const { currentPassword, newPassword } = req.body

        if(!currentPassword) throw "Current password is required"
        if(!newPassword) throw "New password is required"

        console.log("checkpoint 1")

        const user = await User.findOne({
            where: {
                email: req.user.email
            },
            attributes: {
                include: 'password'
            }
        })

        if(!user) throw "User not found"

        // Check if current password matches 
        const matchingPwd = comparePassword(currentPassword, user.password)
        if(!matchingPwd) throw "Current password is incorrect"

        console.log("checkpoint 4")        
        const hashedPassword = hashPassword(newPassword)

        // Update user password
        await User.update(
            { password: hashedPassword },
            {
                where: {
                    id: user.id
                }
            }
        )

        // Send success response
        res.send("Password updated")
    } catch (error) {
        res.status(500).json({error: error})
    }
}


module.exports = {
    register,
    verifyEmail,
    getCurrentUser,
    login,
    verifyToken,
    checkRole,
    forgotPassword,
    resetPassword,
    changePassword
};