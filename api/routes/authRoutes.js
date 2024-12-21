
import express from 'express';
import { register, verifyEmail, login, getProtectedData ,getMyProfile,updateProfile,uploadProfileImage,updatePreferences, getPreferences} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createPost,getMyPosts,getPosts,getPostById,deletePost } from '../controllers/postController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {creategroups,joingroups,leavegroups,listGroups} from '../controllers/groupController.js';
import {followUser, unfollowUser,getFollowers, getFollowing,} from '../controllers/followController.js'; // New controllers for follow functionality
const router = express.Router();

router.post('/register', register);
// Use URL parameter for the token
router.get('/verify-email/:token', verifyEmail); // Now it expects the token in the URL parameter

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
router.get('/posts/:id', isAuthenticated, getPostById); 
router.delete('/posts/:id', isAuthenticated, deletePost);
router.get('/my-posts', isAuthenticated, getMyPosts);


//followers ,follow routes
router.post('/follow', isAuthenticated, followUser); // Follow a user
router.post('/unfollow', isAuthenticated, unfollowUser); // Unfollow a user
router.get('/:userId/followers', isAuthenticated, getFollowers); // Get user's followers
router.get('/:userId/following', isAuthenticated, getFollowing); // Get user's following list

//join gorups
router.post('/creategroups', isAuthenticated,  creategroups);
router.post('/groups/:groupId/join', isAuthenticated, joingroups); 
router.get('/groups',isAuthenticated, listGroups);
router.post('/groups/:groupId/leave', isAuthenticated, leavegroups);

export default router;

