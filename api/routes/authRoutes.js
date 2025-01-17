
import express from 'express';
import { register, verifyEmail, login, getProtectedData ,getMyProfile,updateProfile,uploadProfileImage,updatePreferences, getPreferences} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createPost,getMyPosts,getPosts,getPostById,deletePost,getOtherPosts } from '../controllers/postController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {creategroups,joingroups,leavegroups,listGroups} from '../controllers/groupController.js';

import { createConversation, getConversations, getConversationByUsers,sendMessage,getMessages ,sendGroupMessage,getGroupMessages} from '../controllers/conversationController.js';
import {followUser, unfollowUser,getFollowers, getFollowing,getSuggestedUsers} from '../controllers/followController.js'; // New controllers for follow functionality
const router = express.Router();

router.post('/register', register);
// Use URL parameter for the token
router.post('/verify-email', verifyEmail);
 

router.post('/login', login);
router.get('/protected', isAuthenticated, getProtectedData);
router.get('/profile', isAuthenticated, getMyProfile); // Authenticated user's profile
router.put('/profile', isAuthenticated, updateProfile); // Endpoint for updating profile
router.post('/profile/image', isAuthenticated, upload.single('profileImage'), uploadProfileImage);

router.put('/preferences', isAuthenticated, updatePreferences); // Update preferences
router.get('/preferences', isAuthenticated, getPreferences);   // Fetch preferences


//posts
router.post('/posts', isAuthenticated, createPost);
router.get('/getposts', isAuthenticated, getPosts);
router.get('/getOtherPosts', isAuthenticated, getOtherPosts);
 
router.get('/posts/:id', isAuthenticated, getPostById); 
router.delete('/posts/:id', isAuthenticated, deletePost);
router.get('/my-posts', isAuthenticated, getMyPosts);


//followers ,follow routes
router.post('/follow', isAuthenticated, followUser); // Follow a user

router.post('/unfollow', isAuthenticated, unfollowUser); // Unfollow a user
router.get('/:userId/followers', isAuthenticated, getFollowers); // Get user's followers
router.get('/:userId/following', isAuthenticated, getFollowing); // Get user's following list
router.get('/suggested-users', isAuthenticated, getSuggestedUsers); // Get user's following list
//join gorups
router.post('/creategroups', isAuthenticated,  creategroups);
router.post('/groups/:groupId/join', isAuthenticated, joingroups); 
router.get('/groups',isAuthenticated, listGroups);
router.post('/groups/:groupId/leave', isAuthenticated, leavegroups);



// Conversation Routes and chats
router.post('/conversations', isAuthenticated, createConversation);  // Create a new conversation
router.get('/conversations/:userId', isAuthenticated, getConversations);  // Get all conversations of a user
router.get('/conversations/find/:firstUserId/:secondUserId', isAuthenticated, getConversationByUsers);  // Get conversation between two users
router.post('/messages', isAuthenticated, sendMessage);  // Send a message
router.get('/messages/:conversationId', isAuthenticated, getMessages);  // Get all messages in a specific conversation
router.post('/messages/group', isAuthenticated, sendGroupMessage);  // Send a message to a group
router.get('/group-messages/:groupId', isAuthenticated, getGroupMessages);  // Get all messages of a specific group

export default router;

