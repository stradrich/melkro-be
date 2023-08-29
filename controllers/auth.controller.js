const jwt = require("jsonwebtoken");
// - Implement user model
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/bcrypt.util.js")
const { mg } = require("../utils/mailgun.util.js");

// - Implement user registration and authentication
async function register(req, res) {
   
    try { 
        console.log('Registering a user...');
    // Database already unique
    // Add another layer to check if user with same email already exist 
    const userExist = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    if (userExist) {
        throw "User already exists";
    }

    // Create user using data from request body.
    // Request body must contain all required fields defined in User model.
    const hashedPassword = hashPassword(req.body.password);
    const user = await User.create({
        ...req.body,
        password: hashedPassword,
    });

    // Create verification token with email (JWT)
    // const token = jwt.sign(
    //     {
    //         email: user.email,
    //     }, 
    //         process.env.SECRET_KEY,
    //     {
    //         expiresIn: "1h", 
    //     }
    // );
    //     console.log(token);

        // MAILGUN
           // Email data
            // const data = {
            //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
            //     to: user.email,
            //     subject: "Verify Your Account",
            //     html: `
            //     Please click on this link to verify your account:
            //     <a href="https://${req.header('Host')}/auth/verify?token=${token}">Verify Account</a>
            //     <br>
            //     <p>This verification link expires in 1 hour</p>
            //     `
            // }

        // 58 to 72 commented out
        // const data = {
        //     from: "mailgun@" + process.env.MAILGUN_DOMAIN,
        //     to: user.email,
        //     subject: "Verify Your Account",
        //     html: `Your token is ${token}`,
        // };

        // // Send email to user with verify link
        // await mg.messages.create(process.env.MAILGUN_DOMAIN, data);

        // // If user received verification link, another email will notify the backend 
        return res.json({
            // message: "Email verification link sent to user's email",
            user
        });  

    } catch (error) {
    // If there is any error, send error as response.
        return res.status(500).json({ error: error});
    }
}

async function verifyEmail(req, res) {
    try {
    // Get verification token from req body
    const { verificationToken } = req.body;
    console.log(verificationToken);

    if (!verificationToken) throw "Invalid verification token"

    // Verify & decode token & get user id 
    const decoded = jwt.verify(verificationToken, process.env.SECRET_KEY)
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
    console.log("checkpoint 3");


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
        return res.status(500).json({ error: error});
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
            { id: user.user_id, email: user.email, role: user.role },
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


module.exports = {
    register,
    verifyEmail,
    login,
};