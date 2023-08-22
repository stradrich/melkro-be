const User = require("../models/User");
const { hashPassword } = require("../utils/bcrypt.util.js");
// CREATE
// Authorization on create new user 
async function createUser(req, res) {
    try {
        // Why only admin? Because you don't want to mess up the database
        if (req.user.role !== "admin"){
            throw 'Unauthorized'
        }

        const hashedPassword = hashPassword(req.body.password);

        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        // users can sign up through front end? 
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

// GET (read)
async function getAllUsers(req, res) {
    try {
        // ADMIN
        if (req.user.role === "admin") {
            // Find all users (with pagination)
            const page = paseInt(req.query.page) || 1; // Get the requested page from query params, default to page 1
            const pageSize = parseInt(req.query.pageSize) || 10; // Set the number of records per page, default to 10

            const offset = (page - 1) * pageSize; // Calculate the offset for the query

            const users = await Users.findAll({
                offset: offset,
                limit: pageSize,
            });

            //Send all users as response
            res.json(users);
        } else if (req.user.role === "provider") {
            // PROVIDER
            // Providers can see other providers and customers who booked their listings
        } else if (req.user.role === "customer") {
            // CUSTOMER
            // Customer can only view their own profile 
            const user = await Users.findByPk(req.user.id);
            if (!user) {
                throw "Please sign up an account"
            }
        }
       
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

// GET (read)
async function getUserById(req, res) {
    try {
        // Find user by id
        const user = await Users.findByPk(parseInt(req.params.user_id));

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error})
    }
}

// POST (update)
async function updateUser(req, res) {
    try {
    // User can only update their own profile
    // TESTING

    const user = await Users.findByPk(parseInt(req.params.user_id))
    console.log("Update User", user);

    if(user.id !== req.user.id) {
        throw "Cannot update other people's profile"
    } else {
        const hashedPassword = hashPassword(req.body.password);
        const updateUser = await User.update(
            {
                ...req.body,
                password: hashedPassword,
            },
            {
                where: {
                    id: parseInt(req.params.user_id),
                },
            }
        );

        // Send updated "updateUser" as response
        res.json(updateUser);
    }
        
    } catch (error) {
        res.status(500).json({ error: error});
    }
}

// DELETE
async function deleteUser(req, res) {
    try {
   // User can only delete their own profile 
   // TESTING 
   
   const user = await User.findByPk(parseInt(req.params.user_id))
   console.log("Delete User:", user);
   console.log(`req role:`, req.user.role);
   console.log(`params role:`, user.role);

   if(req.user.role !== 'admin' && user.id !== req.user.id) {
    throw "Cannot delete other people's profile"
   } else {
    const user = await User.destroy({
        where: {
            id: parseInt(req.params.user_id),
        },
    });
    // Send  deleted user as response 
    res.json(user);
   }
    } catch (error) {
      res.status(500).json({ error: error}); 
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};