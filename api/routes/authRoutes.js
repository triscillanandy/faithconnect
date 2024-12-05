
import express from 'express';
import { register, verifyEmail, login, getProtectedData ,getMyProfile,updateProfile,uploadProfileImage,updatePreferences, getPreferences} from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
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







export default router;

