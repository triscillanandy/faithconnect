
import express from 'express';
import { register, verifyEmail, login, getProtectedData ,getMyProfile,updateProfile,uploadProfileImage,updatePreferences, getPreferences} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createPost,getPosts,getPostById,deletePost } from '../controllers/postController.js';
import { upload } from '../middleware/uploadMiddleware.js';
import {followUser, unfollowUser,getFollowers, getFollowing,} from '../controllers/followController.js'; // New controllers for follow functionality
const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail); // React should send token here
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



//followers ,follow routes
router.post('/follow', isAuthenticated, followUser); // Follow a user
router.post('/unfollow', isAuthenticated, unfollowUser); // Unfollow a user
router.get('/:userId/followers', isAuthenticated, getFollowers); // Get user's followers
router.get('/:userId/following', isAuthenticated, getFollowing); // Get user's following list


export default router;

