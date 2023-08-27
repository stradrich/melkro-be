// This is still necessary although we have websocket
// Websocket provide mechanism for establishing persistent, full-duplex communication channel between the client and the server
// Why? 
// 1. Business logic - handle message formatting, massage storage, validation, any actions developer/company want to perform when messages are sent or received.
// 2. Integration with other modules - act as central hub for coordinating messaging-related operations across various parts of your application.
// 3. Authentication and Authorization - 
// 4. Data Validation - Ensure incoming messages adhere to a certain structure or format before broadcasting them to other clients. This can help prevent malformed or malicious messages
// 5. Database integration - interact with database to store and retrieve messages.
// 6. Custom features - implement messaging threading, history, user presence, or message notification 

// const { Op } = require('sequelize');
// const Messaging = require("../models/Messaging.js");
// const Websocket = require("./websocket/websocket.controller");
// const { validationResult } = require('express-validator'); 

// const sendMessage = async (req, res) => {
//       // Extra Features
//         // Implement input validation to ensure that the required data is provided and has the expected format.
//         // Define validation format
//         const validateFormat = [
//             Messaging.check('sender_id').notEmpty().isInt(),
//             Messaging.check('recipient_id').notEmpty().isInt(),
//             Messaging.check('messageText').notEmpty.isString()
//         ];

//          // Validate input data (senderId, recipientId, messageText)
//          const errors = validationResult(req);
//          if (!errors.isEmpty()) {
//             return res.status(400).json({ error: errors.array()})
//          }

//     try {
//         const { senderId, recipientId, messageText } = req.body;

//         // Implement logic to store the message in a database or other storage
//         // Create a new message record in the database
//         const newMessage = await Message.create({
//             conversation_id: conversation_id,
//             sender_id: sender_id,
//             content: messageText
//         });

//         // Notify recipient via WebSocket about the new message
//         Websocket.wss.notifyMessage(recipientId, newMessage)

//         // Return success response
//         res.status(200).json({ message: "Message sent successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error sending message:", error);
//         res.status(500).json({ error: "An error occurred while sending the message" });
//     }
// };

  
// const getConversation = async (req, res) => {
//     try {
//         const { user1Id, user2Id } = req.params;

//         // Validate input data (user1Id, user2Id)

//         // Retrieve conversation messages from the database or storage
//         const conversationMessages = await Message.findAll({
//             where: {
//                 conversation_id: {
//                     [Op.in]: [user1Id, user2Id]
//                 },
//                 order: [['sent_at', 'ASC']]
//             }
//         })


//         // Return the conversation messages
//         res.status(200).json({ conversation: conversationMessages });
//     } catch (error) {s
//         // Handle errors
//         console.error("Error retrieving conversation:", error);
//         res.status(500).json({ error: "An error occurred while retrieving the conversation" });
//     }
// };

  
// const getConversationsForUser = async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Validate input data (userId)

//         // Retrieve all conversations involving the user
//         const userConversations = await conversation.findAll({
//             where: {
//                 [Op.or]: [{ user1_id: userId}, {user2_id: userId}]
//             },
//             include: [
//                 { model: User, as: 'user1'},
//                 { model: User, as: 'user2'}
//             ]
//         })

//         // Return the list of conversations
//         res.status(200).json({ conversations: userConversations });
//     } catch (error) {
//         // Handle errors
//         console.error("Error retrieving conversations:", error);
//         res.status(500).json({ error: "An error occurred while retrieving conversations" });
//     }
// };

  
// // Extra Features
// // Implement input validation to ensure that the required data is provided and has the expected format.
// // Consider using a database to store messages and conversations. MongoDB, PostgreSQL, or other databases could be suitable options.
// // Implement authentication and authorization to ensure that users can only access their own conversations.
// // Implement pagination for fetching a limited number of messages or conversations at a time.
// // Use appropriate HTTP status codes and error handling to provide clear responses to clients.
// // Consider adding real-time capabilities using technologies like WebSockets for instant messaging updates.
// // Remember that these are basic outlines, and you'll need to adapt them to your specific application's requirements and the technologies you're using.


// module.exports = {
//     sendMessage,
//     getConversation,
//     getConversationsForUser
// };



  