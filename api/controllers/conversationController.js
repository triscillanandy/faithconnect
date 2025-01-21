import Conversation from '../models/Conversation.js'; 
import Message from '../models/Message.js'; 
import { Sequelize } from 'sequelize';
import { Server as SocketIo } from 'socket.io'; // Correct way to import socket.io
import User from "../models/User.js"; // Adjust path based on your project structure
import Op from 'sequelize';
import Group from "../models/Group.js";
// Create a new conversation

export const createConversation = async (req, res) => {
  const { userIds } = req.body;

  try {
    // Check if a conversation already exists between the users
    const existingConversation = await Conversation.findOne({
      where: {
        userIds: { [Sequelize.Op.contains]: userIds },
      },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation);
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

export const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.findAll({
      where: { conversationId },
      include: [
        {
          model: User,
          as: 'user', // Use the correct alias defined in the association
          attributes: ['id', 'username', 'profileImage'],
        },
      ],
      order: [['createdAt', 'ASC']], // Order messages by createdAt in descending order
    });

    const formattedMessages = messages.map((message) => ({
      id: message.id,
      text: message.text,
      senderId: message.sender, // Use the correct foreign key
      sender: {
        id: message.user.id, // Access the user using the correct alias
        username: message.user.username,
        profileImage: message.user.profileImage || 'default.png',
      },
      createdAt: message.createdAt,
    }));

    res.status(200).json(formattedMessages); // Always returns an array
  } catch (error) {
    console.error('Error fetching messages:', error.message);
    res.status(500).json([]); // Fallback to an empty array on error
  }
};


export const getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch conversations involving the user
    const conversations = await Conversation.findAll({
      where: {
        userIds: { [Sequelize.Op.contains]: [userId] }, // PostgreSQL array operator
      },
      order: [['createdAt', 'ASC']], // Order conversations by createdAt in descending order
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

    // if (!conversation) {
    //   return res.status(404).json({ error: 'Conversation not found.' });
    // }

    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching conversation.' });
  }
};


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

// export const sendGroupMessage = async (req, res) => {
//   const { groupId, senderId, message } = req.body;

//   try {
//     if (!groupId || !senderId || !message) {
//       return res.status(400).json({ error: 'Invalid request: Missing required fields.' });
//     }

//     // Verify if the user is a member of the group
//     const isMember = await GroupMember.findOne({
//       where: { group_id: groupId, user_id: senderId },
//     });

//     if (!isMember) {
//       return res.status(403).json({ error: 'You are not a member of this group.' });
//     }

//     // Create a new group message
//     const newMessage = await Message.create({
//       groupId,
//       sender: senderId,
//       text: message,
//     });

//     return res.status(201).json(newMessage);
//   } catch (err) {
//     console.error('Error sending group message:', err);
//     return res.status(500).json({ error: 'Error sending group message.' });
//   }
// };


export const sendGroupMessage = async (req, res) => {
  const {       conversationId,
    sender: senderId,
    text: message,} = req.body;

  try {
    // Validate the conversation
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation || conversation.type !== 'group') {
      return res.status(404).json({ error: 'Group conversation not found.' });
    }

    // Save the message
    const newMessage = await Message.create({
      conversationId,
      sender: senderId,
      text: message,
    });

    // Return the new message
    return res.status(201).json(newMessage);
  } catch (err) {
    // console.error(err);
    console.log('Error sending message:', err.message);
    return res.status(500).json({ error: 'Error sending message.' });
    
  }
};



export const getGroupConversation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the group conversation by ID
    const conversation = await Conversation.findOne({
      where: { id, type: 'group' },
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Group conversation not found.' });
    }

    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching group conversation.' });
  }
};

export const getGroupMessages = async (req, res) => {
  const { id } = req.params;

  try {
    // Find all messages related to the group conversation and include sender details
    const messages = await Message.findAll({
      where: { groupId: id },
      order: [['createdAt', 'ASC']], // Optional: Sort messages by creation time
      include: [
        {
          model: User,
          as: 'user', /// Make sure the alias matches the association in the model
          attributes: ['id', 'username', 'email'], // Adjust attributes as needed
        },
      ],
    });
   console.log('Messages:', messages);
    if (!messages.length) {
      return res.status(404).json({ error: 'No messages found for this group conversation.' });
    }

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching group messages.' });
  }
};

// export const getGroupMessages = async (req, res) => {
//   const { groupId } = req.params; // Use groupId as the parameter

//   try {
  
//     const conversation = await Conversation.findOne({ where: { groupId } });
//     console.log(conversation);
//     if (!conversation) {
//       return res.status(404).json({ error: 'Conversation not found for the specified group' });
//     }

//     const { id: conversationId } = conversation;

//     // Fetch messages associated with the determined conversationId
//     const messages = await Message.findAll({
//       where: { conversationId },
//       include: [
//         {
//           model: User,
//           as: 'user', // Alias defined in the Sequelize association
//           attributes: ['id', 'username', 'profileImage'],
//         },
//       ],
//       order: [['createdAt', 'ASC']], // Ensure messages are sorted by creation time
//     });

//     // Format messages for a consistent API response
//     const formattedMessages = messages.map((message) => ({
//       id: message.id,
//       text: message.text,
//       senderId: message.senderId,
//       sender: {
//         id: message.user.id,
//         username: message.user.username,
//         profileImage: message.user.profileImage || 'default.png',
//       },
//       createdAt: message.createdAt,
//     }));

//     // Send the formatted messages as a response
//     res.status(200).json(formattedMessages);
//   } catch (error) {
//     console.error('Error fetching group messages:', error.message);
//     res.status(500).json({ error: 'An error occurred while fetching group messages.' });
//   }
// };

export const checkConversationExists = async (req, res) => {
  const { userId1, userId2 } = req.params;

  try {
    const conversation = await Conversation.findOne({
      where: {
        userIds: { [Op.contains]: [userId1, userId2] },
      },
    });

    if (conversation) {
      return res.status(200).json({ exists: true, conversation });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while checking the conversation.' });
  }
};

// export const createGroupConversation = async (req, res) => {
//   const { groupId } = req.body;

//   try {
//     // Validate groupId
//     if (!groupId) {
//       return res.status(400).json({ error: 'Group conversations must have a valid groupId.' });
//     }

//     // Create a new group conversation
//     const newConversation = await Conversation.create({
//       type: 'group',
//       groupId,
//     });

//     return res.status(201).json(newConversation);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Error creating group conversation.' });
//   }
// };


export const createGroupConversation = async (req, res) => {
  const { groupId } = req.body;

  try {
    // Check if the group exists
    const groupExists = await Group.findByPk(groupId);
    if (!groupExists) {
      return res.status(404).json({ error: 'Group not found.' });
    }

    // Check if a conversation for this group already exists
    const existingConversation = await Conversation.findOne({ where: { groupId, type: 'group' } });
    if (existingConversation) {
      return res.status(200).json(existingConversation);
    }

    // Create a new conversation for the group
    const newConversation = await Conversation.create({ groupId, type: 'group' });
    return res.status(201).json(newConversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating group conversation.' });
  }
};
