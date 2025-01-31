
import express from 'express';

import User from '../models/User.js';// Named export for User model

const router = express.Router();

// Get stream URL for a specific streamKey
export const getStreamUrl = async (req, res) => {
  const { streamKey } = req.params;
  const userId = req.user.id; // Authenticated user's ID from JWT

  try {
    // Find the user associated with the authenticated user ID and streamKey
    const user = await User.findOne({
      where: { id: userId, streamKey },
    });

    if (!user) {
      return res.status(404).json({ message: 'Stream not found or unauthorized.' });
    }

    // Generate the stream URL
    const streamUrl = `http://localhost:8000/live/${streamKey}/index.m3u8`;
    res.json({ streamUrl });
  } catch (error) {
    console.error('Error fetching stream URL:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const startliveStream = async (req, res) => {
    const userId = req.user.id; // Authenticated user's ID from JWT
  
    try {
      // Generate a unique streamKey
      const streamKey = Math.random().toString(36).substring(2, 15);
  
      // Update the user's streamKey in the database
      await User.update({ streamKey }, { where: { id: userId } });
  
      // Return the streamKey to the frontend
      res.json({ streamKey });
    } catch (error) {
      console.error('Error starting stream:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
};
