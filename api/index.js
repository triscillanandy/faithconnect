import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { sequelize } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import { configurePassport } from './config/passport.js';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config(); // Load environment variables

// Middleware
var corsOptions = {
  origin: 'http://localhost:5173',
};
const app = express();
app.use(express.json());
// app.use(cors());
app.use(cors(corsOptions));

app.use(passport.initialize());

// Passport configuration
configurePassport(passport);

// Auth routes
app.use('/api/auth', authRoutes);

// Cloudinary configuration using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Example of uploading an image to Cloudinary
(async function() {
  try {
    const uploadResult = await cloudinary.uploader.upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      { public_id: 'shoes' }
    );
    console.log(uploadResult);

    // Optimizing delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
      fetch_format: 'auto',
      quality: 'auto',
    });
    console.log(optimizeUrl);

    // Transforming the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });
    console.log(autoCropUrl);
  } catch (error) {
    console.error('Cloudinary upload error:', error);
  }
})();

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads/profile-images', express.static(path.join(__dirname, 'uploads/profile-images')));

// Connect to PostgreSQL using Sequelize
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected with Sequelize');
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
