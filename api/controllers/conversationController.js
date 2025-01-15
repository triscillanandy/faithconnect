import Conversation from '../models/Conversation.js'; 
import Message from '../models/Message.js'; 
import { Sequelize } from 'sequelize';
    
// Create a new conversation
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const newConversation = await Conversation.create({
      userIds: [senderId, receiverId],
    });

    return res.status(200).json(newConversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating conversation.' });
  }
};

// Get all conversations for a user
export const getConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    const conversations = await Conversation.findAll({
      where: {
        userIds: { [Sequelize.Op.contains]: [userId] }, // PostgreSQL array operator
      },
    });

    return res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message  });
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

// Send a message in a conversation
export const sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;

  try {
    const newMessage = await Message.create({
      conversationId,
      sender,
      text,
    });

    return res.status(200).json(newMessage);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error creating message.' });
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
