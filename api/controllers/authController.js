


import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { randomBytes } from 'crypto';
import fs from 'fs';
dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Register a new user
export const register = async (req, res) => {
  const { username, email, phone, firstName, lastName,password,  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

   
    // Generate a verification token
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      phone,
      firstName, 
      lastName,
      password,
    
      isVerified: false,
      verificationToken,
    });

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
    };

    await transporter.sendMail(mailOptions);


    res.status(201).json({ message: 'User registered successfully', user: { email: newUser.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify email
export const verifyEmail = async (req, res) => {
  const { token } = req.body;

  try {
    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by email
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid token or user not found' });
    }

    // Update user's verification status
    user.isVerified = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const getProtectedData = async (req, res) => {
  try {
    // Example: Fetch user data using the authenticated user's ID
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'This is protected data.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email before logging in.' });
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login successful', user: { email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Fetch authenticated user's profile
// export const getMyProfile = async (req, res) => {
//   try {
//     // Fetch user data using the authenticated user's ID
//     const user = await User.findByPk(req.user.id, {
//       attributes: ['id', 'username', 'email', 'dateOfBirth', 'isVerified','profileImage'], // Limit exposed fields
//     });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     res.json({ user });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email', 'dateOfBirth', 'isVerified', 'profileImage'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const profileImageUrl = user.profileImage
      ? `${req.protocol}://${req.get('host')}/uploads/profile-images/${user.profileImage}`
      : null;

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        isVerified: user.isVerified,
        profileImage: profileImageUrl, // Include full image URL
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update authenticated user's profile details
export const updateProfile = async (req, res) => {
  try {
    const { username, email, dateOfBirth, preferences } = req.body;

    // Find the user by the authenticated user's ID
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update user data with the provided fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.preferences = preferences || user.preferences; // Update preferences if provided

    // Save the updated user information
    await user.save();

    res.json({ message: 'Profile updated successfully.', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (req.file) {
      // Delete old profile image if it exists
      if (user.profileImage) {
        fs.unlinkSync(`./uploads/profile-images/${user.profileImage}`);
      }

      user.profileImage = req.file.filename;
      await user.save();
    }

    res.json({ message: 'Profile image uploaded successfully.', profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePreferences = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update preferences
    user.preferences = req.body.preferences || user.preferences;
    await user.save();

    // Return the updated user data with preferences
    res.json({
      id: user.id,
      email: user.email,
      preferences: user.preferences,
      message: 'Preferences updated successfully.',
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPreferences = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username','email', 'preferences'], // Include id, username, and preferences
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

