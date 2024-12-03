import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { sequelize } from './config/database.js'; // Updated import
import authRoutes from './routes/authRoutes.js';
import { configurePassport } from './config/passport.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Passport configuration
configurePassport(passport);

// Auth routes
app.use('/api/auth', authRoutes);




// Connect to PostgreSQL using Sequelize
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected with Sequelize');
    // Sync models with the database
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start the server
const PORT = process.env.PORT || 3001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
