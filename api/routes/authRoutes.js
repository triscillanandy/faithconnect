// import express from 'express';
// import passport from 'passport';
// import { register, login } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/register', register);
// router.post('/login', login);

// // Protected route example
// router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ user: req.user });
// });

// export default router;

import express from 'express';
import { register, verifyEmail, login, getProtectedData } from '../controllers/authController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail); // React should send token here
router.post('/login', login);
router.get('/protected', isAuthenticated, getProtectedData);

export default router;

