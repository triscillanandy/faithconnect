import { Router } from 'express';

import Message from '../models/Message.js';
const router = Router();

// Create a new message
router.post("/", async (req, res) => {
  const { conversationId, sender, text } = req.body;

  try {
    // Create a new message
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
});

// Get messages for a specific conversation
router.get("/:conversationId", async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.findAll({
      where: {
        conversationId: conversationId,
      },
    });

    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error fetching messages.' });
  }
});

export default router;
