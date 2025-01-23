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
import { Server as socketIo } from 'socket.io';  // Correct way to import socket.io

dotenv.config(); // Load environment variables

// Middleware
var corsOptions = {
  origin: 'http://localhost:5173',  // Adjust your frontend URL if needed
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

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

// Start the HTTP server
const server = app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3001}`);
});

// Initialize Socket.IO with the server instance
const io = new socketIo(server, {
  cors: corsOptions,  // Use the same CORS options for Socket.IO
});

// // Socket.io logic
// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   console.log("A user connected.");

//   // When a user connects, register their userId and socketId
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   // Send and receive messages
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     if (user) {
//       io.to(user.socketId).emit("getMessage", {
//         senderId,
//         text,
//       });
//     }
//   });

//   // When a user disconnects, remove them from the user list
//   socket.on("disconnect", () => {
//     console.log("A user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

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

connectDB().then(() => {
  // The server has already started, no need to start it again
});



// // Active users array
// let activeUsers = [];

// // Socket.IO integration
// io.on('connection', (socket) => {
// //  console.log('A user connected');

//   // Add a new user
//   socket.on('joinRoom', (userId) => {
//     if (!activeUsers.some((user) => user.userId === userId)) {
//       activeUsers.push({ userId, socketId: socket.id });
//       console.log('New user added:', activeUsers);
//     }
//     io.emit('get-users', activeUsers);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//     console.log('User disconnected:', activeUsers);
//     io.emit('get-users', activeUsers);
//   });

//   socket.on("sendMessage", async ({senderId, receiverId, message, conversationId }) => {
//     const receiver = activeUsers.find(user => user.userId === receiverId);
//     const sender = activeUsers.find(user => user.userId === senderId);
//     //const user = await Users.findById(senderId); // Assuming 'Users' is your model.

//     if (receiver) {
//         // Emit to both the sender and receiver.
//         io.to(receiver.socketId).emit("receive-message", {
//             senderId,
//             message,
//             conversationId,
//             receiverId,
         
//         });
//         console.log("Received message:", { senderId, receiverId, message, conversationId });

//     } else {
//         // Emit only to the sender if receiver is not online.
//         io.to(sender.socketId).emit("receive-message", {
//             senderId,
//             message,
//             conversationId,
//             receiverId,
           
//         });
//         console.log("Received message:", { senderId, receiverId, message, conversationId });
//     }


//   });
// });

// // Pass `io` to the chat controller
// app.set('io', io);
// Active users array
// Active users array
// Active users array
let activeUsers = []; // Change const to let
const activeGroups = {}; // No change here

// io.on('connection', (socket) => {
//   // Handle user joining a room or group
//   socket.on('joinRoom', (userId) => {
//     // Check if the user is already active
//     if (!activeUsers.some((user) => user.userId === userId)) {
//       activeUsers.push({ userId, socketId: socket.id });
//       console.log('New user added:', activeUsers);
//     }

//     // Broadcast updated user list to all clients
//     io.emit('get-users', activeUsers);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     // Remove user from activeUsers
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

//     // // Remove user from all groups they were part of
//     for (const groupId in activeGroups) {
//       activeGroups[groupId].delete(socket.id);
//       if (activeGroups[groupId].size === 0) {
//         delete activeGroups[groupId];
//       }
//     }

//     console.log('User disconnected:', activeUsers);
//     io.emit('get-users', activeUsers);
//   });

//   // Handle sending messages
//   socket.on('sendMessage', ({ senderId, receiverId, message, conversationId, groupId }) => {
//     if (groupId) {
//       // Group message
//       const groupMembers = activeGroups[groupId] || new Set();
//       groupMembers.forEach((memberSocketId) => {
//         if (memberSocketId !== socket.id) { // Don't send message back to sender
//           io.to(memberSocketId).emit('receive-group-message', {
//             conversationId,
//             senderId,
//             message,
//             groupId,
//           });
//         }
//       });
//       console.log(`Group message sent to group ${groupId}:`, { senderId, message });
//     } else if (receiverId) {
//       // Direct message
//       const receiver = activeUsers.find((user) => user.userId === receiverId);
//       const sender = activeUsers.find((user) => user.userId === senderId);

//       if (receiver) {
//         // Emit message to receiver immediately
//         io.to(receiver.socketId).emit('receive-message', {
//           senderId,
//           message,
//           conversationId,
//           receiverId,
//         });
//         console.log(`Direct message sent to receiver ${receiverId}:`, { senderId, receiverId, message, conversationId });
//       }

//       // Always notify sender (to show message as sent)
//       if (sender) {
//         io.to(sender.socketId).emit('receive-message', {
//           senderId,
//           message,
//           conversationId,
//           receiverId,
//         });
//       }
//     }
//   });
// });

io.on('connection', (socket) => {
  // Handle user joining a room or group
  socket.on('joinRoom', (userId) => {
    // Check if the user is already active
    if (!activeUsers.some((user) => user.userId === userId)) {
      activeUsers.push({ userId, socketId: socket.id });
      console.log('New user added:', activeUsers);
    }

    // Broadcast updated user list to all clients
    io.emit('get-users', activeUsers);
  });

  // Handle user joining a group
  socket.on('joinGroup', ({ groupId, userId }) => {
    if (!activeGroups[groupId]) {
      activeGroups[groupId] = new Set(); // Initialize a new Set for the group
    }
    activeGroups[groupId].add(socket.id); // Add the user's socket ID to the group
    console.log(`User ${userId} joined group ${groupId}:`, activeGroups[groupId]);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    // Remove user from activeUsers
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

    // Remove user from all groups they were part of
    for (const groupId in activeGroups) {
      activeGroups[groupId].delete(socket.id);
      if (activeGroups[groupId].size === 0) {
        delete activeGroups[groupId];
      }
    }

    console.log('User disconnected:', activeUsers);
    io.emit('get-users', activeUsers);
  });

  // Handle sending direct messages
  socket.on('sendMessage', ({ senderId, receiverId, message, conversationId }) => {
    const receiver = activeUsers.find((user) => user.userId === receiverId);
    const sender = activeUsers.find((user) => user.userId === senderId);

    if (receiver) {
      // Emit message to receiver immediately
      io.to(receiver.socketId).emit('receive-message', {
        senderId,
        message,
        conversationId,
        receiverId,
      });
      console.log(`Direct message sent to receiver ${receiverId}:`, { senderId, receiverId, message, conversationId });
    }

    // Always notify sender (to show message as sent)
    if (sender) {
      io.to(sender.socketId).emit('receive-message', {
        senderId,
        message,
        conversationId,
        receiverId,
      });
    }
  });

  // Handle sending group messages
  socket.on('sendGroupMessage', ({ senderId, message, conversationId, groupId }) => {
    const groupMembers = activeGroups[groupId] || new Set();
    console.log('groupMembers:', groupMembers); // Log group members
    groupMembers.forEach((memberSocketId) => {
      if (memberSocketId !== socket.id) { // Don't send message back to sender
        io.to(memberSocketId).emit('receive-group-message', {
          conversationId,
          senderId,
          message,
          groupId,
        });
      }
    });
    console.log(`Group message sent to group ${groupId}:`, { senderId, message });
  });
});

// let activeUsers = []; // Track active users
// const activeGroups = {}; // Track active group members

// io.on('connection', (socket) => {
//   // Handle user joining a room or group
//   socket.on('joinRoom', (userId) => {
//     // Check if the user is already active
//     if (!activeUsers.some((user) => user.userId === userId)) {
//       activeUsers.push({ userId, socketId: socket.id });
//       console.log('New user added:', activeUsers);
//     }

//     // Broadcast updated user list to all clients
//     io.emit('get-users', activeUsers);
//   });

//   // Handle user joining a group
//   socket.on('joinGroup', ({ groupId, userId }) => {
//     if (!activeGroups[groupId]) {
//       activeGroups[groupId] = new Set(); // Initialize a new Set for the group
//     }
//     activeGroups[groupId].add(socket.id); // Add the user's socket ID to the group
//     console.log(`User ${userId} joined group ${groupId}:`, activeGroups[groupId]);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     // Remove user from activeUsers
//     activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);

//     // Remove user from all groups they were part of
//     for (const groupId in activeGroups) {
//       activeGroups[groupId].delete(socket.id);
//       if (activeGroups[groupId].size === 0) {
//         delete activeGroups[groupId];
//       }
//     }

//     console.log('User disconnected:', activeUsers);
//     io.emit('get-users', activeUsers);
//   });

//   // Handle sending messages
//   socket.on('sendMessage', ({ senderId, receiverId, message, conversationId, groupId }) => {
//     if (groupId) {
//       // Group message
//       const groupMembers = activeGroups[groupId] || new Set();
//       groupMembers.forEach((memberSocketId) => {
//         if (memberSocketId !== socket.id) { // Don't send message back to sender
//           io.to(memberSocketId).emit('receive-group-message', {
//             senderId,
//             message,
//             groupId,
//           });
//         }
//       });
//       console.log(`Group message sent to group ${groupId}:`, { senderId, message });
//     } else if (receiverId) {
//       // Direct message
//       const receiver = activeUsers.find((user) => user.userId === receiverId);
//       const sender = activeUsers.find((user) => user.userId === senderId);

//       if (receiver) {
//         // Emit message to receiver immediately
//         io.to(receiver.socketId).emit('receive-message', {
//           senderId,
//           message,
//           conversationId,
//           receiverId,
//         });
//         console.log(`Direct message sent to receiver ${receiverId}:`, { senderId, receiverId, message, conversationId });
//       }

//       // Always notify sender (to show message as sent)
//       if (sender) {
//         io.to(sender.socketId).emit('receive-message', {
//           senderId,
//           message,
//           conversationId,
//           receiverId,
//         });
//       }
//     }
//   });
// });
