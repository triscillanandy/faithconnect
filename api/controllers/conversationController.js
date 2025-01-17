import Conversation from '../models/Conversation.js'; 
import Message from '../models/Message.js'; 
import { Sequelize } from 'sequelize';
import { Server as SocketIo } from 'socket.io'; // Correct way to import socket.io
import User from "../models/User.js"; // Adjust path based on your project structure
import Op from 'sequelize';
// Create a new conversation
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    // Ensure user IDs are sorted to maintain consistency
    const userIds = [senderId, receiverId].sort();

    // Check if a conversation already exists
    const existingConversation = await Conversation.findOne({
      where: { userIds: { [Sequelize.Op.contains]: userIds } }, // PostgreSQL array operator
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation); // Return the existing conversation
    }

    // Create a new conversation if none exists
    const newConversation = await Conversation.create({
      userIds,
    });

    return res.status(201).json(newConversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating conversation.' });
  }
};


// export const getConversations = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const conversations = await Conversation.findAll({
//       where: {
//         userIds: { [Op.contains]: [userId] }, // PostgreSQL array operator
//       },
//       include: [
//         {
//           model: User, // Assuming a User model is associated with Conversation
//           attributes: ["id", "username" ], // Only include necessary fields
//           through: { attributes: [] }, // Prevents including join table data
//         },
//       ],
//     });

//     return res.status(200).json(conversations);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: err.message });
//   }
// };


// export const getConversations = async (req, res) => {
//   const { userId } = req.params;

//   try {
//     // Fetch conversations involving the user
//     const conversations = await Conversation.findAll({
//       where: {
//         userIds: { [Sequelize.Op.contains]: [userId] }, // PostgreSQL array operator for array containment
//       },
//     });

//     // Fetch receiver information for each conversation
//     const conversationUserData = await Promise.all(
//       conversations.map(async (conversation) => {
//         const receiverId = conversation.userIds.find((id) => id !== userId);

//         if (!receiverId) {
//           return {
//             user: null,
//             conversationId: conversation.id,
//           };
//         }

//         const receiver = await User.findByPk(receiverId); // Using primary key lookup
//         return {
//           user: receiver
//             ? {
//                 receiverId: receiver.id,
//                 email: receiver.email,
//                 fullName: receiver.username,
//               }
//             : null,
//           conversationId: conversation.id,
//         };
//       })
//     );

//     // Send the response
//     res.status(200).json(conversationUserData);
//   } catch (error) {
//     console.error("Error fetching conversations:", error);
//     res.status(500).json({ error: error.message });
//   }
// };


export const getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch conversations involving the user
    const conversations = await Conversation.findAll({
      where: {
        userIds: { [Sequelize.Op.contains]: [userId] }, // PostgreSQL array operator
      },
    });

    // Fetch receiver details for each conversation
    const conversationUserData = await Promise.all(
      conversations.map(async (conversation) => {
        const receiverId = conversation.userIds.find((id) => id !== userId);

        const receiver = receiverId
          ? await User.findByPk(receiverId, {
              attributes: ["id", "username", "email", "profileImage"],
            })
          : null;

        return {
          conversationId: conversation.id,
          receiver: receiver
            ? {
                id: receiver.id,
                username: receiver.username,
                email: receiver.email,
                profilePicture: receiver.profileImage || "default.png",
              }
            : null,
        };
      })
    );

    res.status(200).json(conversationUserData);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get conversation between two users
export const getConversationByUsers = async (req, res) => {
  const { firstUserId, secondUserId } = req.params;

  try {
    const conversation = await Conversation.findOne({
      where: {
        userIds: { [Sequelize.Op.contains]: [firstUserId, secondUserId] }, // PostgreSQL array operator
      },
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found.' });
    }

    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching conversation.' });
  }
};

// import { Sequelize } from 'sequelize';
// import Conversation from '../models/Conversation.js';
// import User from '../models/User.js';

// // Get conversation between two users with profile data
// export const getConversationByUsers = async (req, res) => {
//   const { firstUserId, secondUserId } = req.params;

//   try {
//     // Find the conversation between the two users
//     const conversation = await Conversation.findOne({
//       where: {
//         userIds: { [Sequelize.Op.contains]: [firstUserId, secondUserId] }, // PostgreSQL array operator
//       },
//     });

//     if (!conversation) {
//       return res.status(404).json({ error: 'Conversation not found.' });
//     }

//     // Fetch user details for both users
//     const users = await User.findAll({
//       where: {
//         id: { [Sequelize.Op.in]: [firstUserId, secondUserId] },
//       },
//       attributes: ['id', 'userName', 'imgSrc'], // Fetch only necessary fields
//     });

//     // Map users to their respective IDs
//     const userMap = users.reduce((map, user) => {
//       map[user.id] = {
//         id: user.id,
//         userName: user.userName,
//         imgSrc: user.imgSrc,
//       };
//       return map;
//     }, {});

//     // Enrich the conversation data with user details
//     const enrichedConversation = {
//       ...conversation.toJSON(),
//       participants: {
//         firstUser: userMap[firstUserId],
//         secondUser: userMap[secondUserId],
//       },
//     };

//     return res.status(200).json(enrichedConversation);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Error fetching conversation.' });
//   }
// };


export const sendMessage = async (req, res) => {
  const { conversationId, senderId, message } = req.body;
  
  //console.log('Request body:', req.body);

  try {
    // Create new message
    const newMessage = await Message.create({
      conversationId,
      sender: senderId,
      text: message,
    });
    console.log('Message created:', newMessage);
   
    return res.status(200).json(newMessage);
  } catch (err) {
    console.error('Error creating message:', err);
    return res.status(500).json({ error: err.message });
  }
};


// Get all messages for a specific conversation
export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        conversationId,
      },
    });

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching messages.' });
  }
};
