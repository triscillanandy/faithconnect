import express from 'express';
import passport from 'passport';
import { connectDB } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import { configurePassport } from './config/passport.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(passport.initialize());

configurePassport(passport);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
