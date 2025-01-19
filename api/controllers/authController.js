


import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { randomBytes } from 'crypto';
import fs from 'fs';
import { Op } from 'sequelize';
dotenv.config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

import crypto from 'crypto';

// Register a new user
/**
 * Registers a new user.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The request body.
 * @param {string} req.body.username - The username of the new user.
 * @param {string} req.body.email - The email of the new user.
 * @param {string} req.body.phone - The phone number of the new user.
 * @param {string} req.body.firstName - The first name of the new user.
 * @param {string} req.body.lastName - The last name of the new user.
 * @param {string} req.body.password - The password of the new user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the user is registered.
 */
export const register = async (req, res) => {
  const { username, email, phone, firstName, lastName, password, userType } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Optionally, set an expiration time for the code (e.g., 15 minutes from now)
    const verificationCodeExpires = Date.now() + 15 * 60 * 1000;

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      phone,
      firstName,
      lastName,
      password, // Ensure you hash the password before saving
      isVerified: false,
      verificationCode,
      verificationCodeExpires,
      userType, // Add userType to the new user
    });

    // Send the verification email with the 6-digit code
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email Verification',
      html: `<p>Your verification code is <strong>${verificationCode}</strong>.</p> 
             <p>Please enter this code on the verification page to activate your account.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'User registered successfully. Please verify your account using the code sent to your email.'});
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { verificationCode } = req.body; // Get the verification code from the request body

  if (!verificationCode) {
    return res.status(400).json({ message: 'Verification code is required' });
  }

  try {
    // Find the user by the verification code
    const user = await User.findOne({ where: { verificationCode: verificationCode } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid code or user not found' });
    }

    // Check if the code has expired
    const currentTime = new Date();
    if (currentTime > new Date(user.verificationCodeExpires)) {
      return res.status(400).json({ message: 'Verification code has expired' });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    // Update user's verification status
    user.isVerified = true;
    user.verificationCode = null; // Remove the code after successful verification
    user.verificationCodeExpires = null; // Remove the expiration time
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
    console.log('Email verified successfully. You can now log in.');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click the link below to reset your password:</p>
             <a href="${resetUrl}">${resetUrl}</a>
             <p>If you did not request this, please ignore this email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: 'Password reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
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
      expiresIn: '2d', // 2 days
    });

    res.json({ token, message: 'Login successful', user: { id : user.id,email: user.email , username : user.username} });
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

