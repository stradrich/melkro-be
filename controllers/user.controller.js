const User = require("../models/User");
const { hashPassword } = require("../utils/bcrypt.util.js");
// CREATE
// Authorization on create new user 
async function createUser(req, res) {
    console.log("checkpoint 1");
    try {
        // Why only admin? Because you don't want to mess up the database
        // console.log("checkpoint 2");
        // if (req.user.role !== "admin"){
        //     throw 'Unauthorized'
        // }

        const hashedPassword = hashPassword(req.body.password);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });
        console.log("checkpoint 3", user);
        // users can sign up through front end? 
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error});
    }
}

// GET SPECIFIC (read)
// async function getAllUsers(req, res) {
//     try {
//         // ADMIN
//         if (req.user.role === "admin") {
//             // Find all users (with pagination)
//             const page = parseInt(req.query.page) || 1; // Get the requested page from query params, default to page 1
//             const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of records per page, default to 10

//             const offset = (page - 1) * pageSize; // Calculate the offset for the query

//             const users = await User.findAll({
//                 offset: offset,
//                 limit: pageSize,
//             });

//             //Send all users as response
//             return res.json(users);
//         } else if (req.user.role === "provider") {
//             // PROVIDER
//             // Providers can see other providers and customers who booked their listings
//         } else if (req.user.role === "customer") {
//             // CUSTOMER
//             // Customer can only view their own profile 
//             const user = await User.findByPk(req.user.id);
//             if (!user) {
//                 throw "Please sign up an account"
//             }
//         }
       
//     } catch (error) {
//         return res.status(500).json({ error: error});
//     }
// }
async function getAllUsers(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const offset = (page - 1) * pageSize;

        const users = await User.findAll({
            offset: offset,
            limit: pageSize,
        });

        return res.json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
}


// GET SPECIFIC (read)
async function getUserById(req, res) {
    try {
        // Find user by id
        const user = await User.findByPk(parseInt(req.params.userId));

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error})
    }
}

// POST (update - removes all restrictions)
async function updateUser(req, res) {
    console.log("Updating user from backend....");
    try {
        // Allow any user to update any profile
        const updateUser = await User.update(
            {
                ...req.body,
            },
            {
                where: {
                    user_id: parseInt(req.params.userId),
                },
            }
        );

        // Send updated "updateUser" as response
        return res.json(updateUser);

    } catch (error) {
        return res.status(500).json({ error: error });
    }
}


// POST (update - prevents frontend changing the hashed password)
// async function updateUser(req, res) {
//     console.log("Updating user from backend....");
//     try {
//         // User can only update their own profile
//         const user = await User.findByPk(parseInt(req.params.userId))
//         console.log("Update User", user);
//         console.log("current user", req.user);

//         if (user.user_id !== req.user.id && req.user.role !== 'admin') {
//             throw "Cannot update other people's profile"
//         } else {
//             // Check if the received password matches the existing hashed password
//             if (req.body.password === user.password) {
//                 const updateUser = await User.update(
//                     {
//                         ...req.body,
//                     },
//                     {
//                         where: {
//                             user_id: parseInt(req.params.userId),
//                         },
//                     }
//                 );

//                 // Send updated "updateUser" as response
//                 return res.json(updateUser);
//             } else {
//                 // Passwords don't match, handle the case appropriately
//                 console.error('Received password does not match the existing password');
//                 return res.status(400).json({ error: 'Invalid password' });
//             }
//         }

//     } catch (error) {
//         return res.status(500).json({ error: error });
//     }
// }


// POST (update)
// async function updateUser(req, res) {
//     console.log("Updating user from backend....");
//     try {
//     // User can only update their own profile
//     // TESTING

//     const user = await User.findByPk(parseInt(req.params.userId))
//     console.log("Update User", user);
//     console.log("current user", req.user);
//     if(user.user_id !== req.user.id && req.user.role !== 'admin') {
//         throw "Cannot update other people's profile"
//     } else {
//         const hashedPassword = hashPassword(req.body.password);
//         const updateUser = await User.update(
//             {
//                 ...req.body,
//                 password: hashedPassword,
//             },
//             {
//                 where: {
//                     user_id: parseInt(req.params.userId),
//                 },
//             }
//         );

//         // Send updated "updateUser" as response
//         return res.json(updateUser);
//     }
        
//     } catch (error) {
//         return res.status(500).json({ error: error});
//     }
// }

// DELETE
async function deleteUser(req, res) {
    try {
   // User can only delete their own profile 
   // TESTING 
   
   const user = await User.findByPk(parseInt(req.params.userId))
   console.log("Delete User:", user);
   console.log(`req role:`, req.user.role);
   console.log(`params role:`, user.role);

   if(req.user.role !== 'admin' && user.user_id !== req.user.id) {
    throw "Cannot delete other people's profile"
   } else {
    const user = await User.destroy({
        where: {
            user_id: parseInt(req.params.userId),
        },
    });
    // Send  deleted user as response 
    return res.json(user);
   }
    } catch (error) {
      return res.status(500).json({ error: error}); 
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};