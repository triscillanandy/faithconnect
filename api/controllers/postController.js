import Post from '../models/Post.js';
import Media from '../models/Media.js';

import fs from 'fs';
import { mediaUpload } from '../middleware/mediaUploadMiddleware.js';  // Import your media upload middleware
import { v2 as cloudinary } from 'cloudinary';




export const createPost = [
  mediaUpload.array('media', 5), // Allows uploading up to 5 files

  async (req, res) => {
    try {
      const { description } = req.body;

      // Create the post in the database
      const newPost = await Post.create({
        description,
        userId: req.user.id, // From isAuthenticated middleware
      });

      // Upload media files to Cloudinary if they exist
      if (req.files && req.files.length > 0) {
        const mediaPromises = req.files.map(async (file) => {
          let uploadResult;
          const fileExtension = file.originalname.split('.').pop().toLowerCase();
          const isVideo = ['mp4', 'avi', 'mov'].includes(fileExtension);

          // Upload the file to Cloudinary with resource_type based on file type
          try {
            if (isVideo) {
              // Upload video to Cloudinary
              uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'posts',
                resource_type: 'video', // Specify that it's a video
              });
            } else {
              // Upload image to Cloudinary
              uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'posts',
                resource_type: 'image', // Specify that it's an image
              });
            }

            // Save media details (URL, type, post ID) in the database
            const media = await Media.create({
              mediaType: file.mimetype, // File type (image/video)
              mediaUrl: uploadResult.secure_url, // Cloudinary URL
              postId: newPost.id, // Link media to the post
            });

            // Delete the local file after successful upload to Cloudinary
            fs.unlinkSync(file.path);
            return media;
          } catch (error) {
            console.error('Error uploading media:', error);
            throw new Error('Error uploading media to Cloudinary');
          }
        });

        // Wait for all media files to upload (images and videos)
        await Promise.all(mediaPromises);
      }

      // Respond with success message and the created post
      res.status(201).json({
        message: 'Post created successfully.',
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];


// export const createPost = [
//     mediaUpload.array('media', 5), // Allows uploading up to 5 files
  
//     async (req, res) => {
//       try {
//         const { description } = req.body;
  
//         // Create the post in the database
//         const newPost = await Post.create({
//           description,
//           userId: req.user.id, // From isAuthenticated middleware
//         });
  
//         // Upload media files to Cloudinary
//         if (req.files && req.files.length > 0) {
//           const mediaPromises = req.files.map(async (file) => {
//             // Upload each file to Cloudinary
//             const uploadResult = await cloudinary.uploader.upload(file.path, {
//               folder: 'posts',
//             });
  
//             // Save media details in the database
//             const media = await Media.create({
//               mediaType: file.mimetype,
//               mediaUrl: uploadResult.secure_url, // Cloudinary URL
//               postId: newPost.id,
//             });
  
//             // Delete local file after Cloudinary upload
//             fs.unlinkSync(file.path);
//             return media;
//           });
  
//           await Promise.all(mediaPromises);
//         }
  
//         res.status(201).json({
//           message: 'Post created successfully.',
//           post: newPost,
//         });
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     },
//   ];
// Create a new post with media
// export const createPost = [
//   // Apply the media upload middleware before handling post creation
//   mediaUpload.array('media', 5), // Adjust the 'media' field name to match the form field, and limit to 5 files (adjust if necessary)

//   async (req, res) => {
//     try {
//       const { description } = req.body;

//       // Validate the request body
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       // Create the new post
//       const newPost = await Post.create({
//         description,
//         userId: req.user.id,
//       });

//       // If there are media files (e.g., images or files), associate them with the post
//       if (req.files && req.files.length > 0) {
//         const mediaPromises = req.files.map(async (file) => {
//           const media = await Media.create({
//             mediaType: file.mimetype,  // Store media type (e.g., image/jpeg)
//             mediaUrl: file.filename,  // Store the file URL (relative path)
//             postId: newPost.id,       // Associate the media with the post
//           });
//           return media;
//         });
//         await Promise.all(mediaPromises);
//       }

//       res.status(201).json({
//         message: 'Post created successfully.',
//         post: newPost,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// ];

// Fetch all posts with media
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: Media,
          as: 'media',
        },
      ],
    });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single post with associated media
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Media,
          as: 'media',
        },
      ],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// // Delete a post and associated media
// export const deletePost = async (req, res) => {
//   try {
//     const post = await Post.findByPk(req.params.id);

//     if (!post) {
//       return res.status(404).json({ message: 'Post not found.' });
//     }

//     // Delete associated media
//     const media = await Media.findAll({ where: { postId: post.id } });
//     media.forEach((item) => fs.unlinkSync(`./uploads/posts/${item.mediaUrl}`)); // Delete media files

//     // Delete the post
//     await post.destroy();

//     res.status(200).json({ message: 'Post and media deleted successfully.' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const deletePost = async (req, res) => {
    try {
      // Fetch the post including its media
      const post = await Post.findOne({
        where: { id: req.params.id },
        include: [{ model: Media, as: 'media' }]
      });
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // If the post has associated media
      if (post.media && post.media.length > 0) {
        // Delete each media from Cloudinary
        for (const media of post.media) {
          const publicId = media.mediaUrl.split('/').slice(-1)[0].split('.')[0]; // Extract public_id
          try {
            await cloudinary.uploader.destroy(`posts/${publicId}`); // Delete from Cloudinary
          } catch (cloudError) {
            console.error('Error deleting media from Cloudinary:', cloudError);
          }
        }
  
        // Delete the media records from the database
        await Media.destroy({ where: { postId: req.params.id } });
      }
  
      // Finally, delete the post
      await post.destroy();
  
      res.status(200).json({ message: 'Post and associated media deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };