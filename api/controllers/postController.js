import Post from '../models/Post.js';
import Media from '../models/Media.js';
import User from '../models/User.js';
import Comment from '../models/comment.js';
import Like from '../models/Like.js';
import Devotional from '../models/Devotional.js'; // Adjust the path as needed
import Sermon from '../models/Sermon.js'; // Adjust the path as needed
import fs from 'fs';
import { mediaUpload } from '../middleware/mediaUploadMiddleware.js';  // Import your media upload middleware
import { v2 as cloudinary } from 'cloudinary';
import { Op } from 'sequelize';



// export const createPost = [
//   mediaUpload.array('media', 5), // Allows uploading up to 5 files

//   async (req, res) => {
//     try {
//       const { description } = req.body;

//       // Create the post in the database
//       const newPost = await Post.create({
//         description,
//         userId: req.user.id, // From isAuthenticated middleware
//       });

//       // Upload media files to Cloudinary if they exist
//       if (req.files && req.files.length > 0) {
//         const mediaPromises = req.files.map(async (file) => {
//           let uploadResult;
//           const fileExtension = file.originalname.split('.').pop().toLowerCase();
//           const isVideo = ['mp4', 'avi', 'mov'].includes(fileExtension);

//           // Upload the file to Cloudinary with resource_type based on file type
//           try {
//             if (isVideo) {
//               // Upload video to Cloudinary
//               uploadResult = await cloudinary.uploader.upload(file.path, {
//                 folder: 'posts',
//                 resource_type: 'video', // Specify that it's a video
//               });
//             } else {
//               // Upload image to Cloudinary
//               uploadResult = await cloudinary.uploader.upload(file.path, {
//                 folder: 'posts',
//                 resource_type: 'image', // Specify that it's an image
//               });
//             }

//             // Save media details (URL, type, post ID) in the database
//             const media = await Media.create({
//               mediaType: file.mimetype, // File type (image/video)
//               mediaUrl: uploadResult.secure_url, // Cloudinary URL
//               postId: newPost.id, // Link media to the post
//             });

//             // Delete the local file after successful upload to Cloudinary
//             fs.unlinkSync(file.path);
//             return media;
//           } catch (error) {
//             console.error('Error uploading media:', error);
//             throw new Error('Error uploading media to Cloudinary');
//           }
//         });

//         // Wait for all media files to upload (images and videos)
//         await Promise.all(mediaPromises);
//       }

//       // Respond with success message and the created post
//       res.status(201).json({
//         message: 'Post created successfully.',
//         post: newPost,
//       });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   },
// ];
export const createPost = [
  mediaUpload.array('media', 5), // Allows uploading up to 5 files

  async (req, res) => {
    try {
      const { description, postType = 'post', content, readingPlan, audioUrl, preacher } = req.body;

      // Create the post in the database
      const newPost = await Post.create({
        description,
        userId: req.user.id, // From isAuthenticated middleware
        postType, // Use the provided postType or default to 'post'
      });

      // Create Devotional or Sermon based on postType
      if (postType === 'devotional') {
        await Devotional.create({
          postId: newPost.id,
          content,
          readingPlan,
        });
      } else if (postType === 'sermon') {
        await Sermon.create({
          postId: newPost.id,
          content,
          audioUrl,
          preacher,
        });
      }

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

export const getMyPosts = async (req, res) => {
  try {
    // Retrieve posts made by the authenticated user (user.id)
    const posts = await Post.findAll({
      where: {
        userId: req.user.id,  // Assuming 'userId' is the foreign key referencing the user in the 'Post' model
      },
      include: [
        {
          model: Media,
          as: 'media',
        },
      ],
    });

    // Check if the user has any posts
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }

    // Return the posts along with the media
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



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



export const getOtherPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      where: {
        userId: {
          [Op.ne]: req.user.id, // Exclude posts created by the authenticated user
        },
      },
      include: [
        {
          model: Media,
          as: 'media',
        },
        {
          model: User,
          as: 'user',
          attributes: ['username','profileImage'], // Include the username of the post owner
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

  export const addComment = async (req, res) => {
    try {
      const { content, postId } = req.body;
  
      // Validate the post exists
      const post = await Post.findByPk(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // Create the comment
      const comment = await Comment.create({
        content,
        postId,
        userId: req.user.id, // Authenticated user's ID
      });
  
      res.status(201).json({
        message: 'Comment added successfully.',
        comment,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
      console.log(error.message)
    }
  };

  
  export const getCommentsByPostId = async (req, res) => {
    try {
      const comments = await Comment.findAll({
        where: { postId: req.params.postId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['username', 'profileImage'],
          },
        ],
      });
  
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  
export const toggleLike = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    // Check if the user already liked the post
    const existingLike = await Like.findOne({
      where: { postId, userId },
    });

    if (existingLike) {
      // Unlike the post
      await existingLike.destroy();
      return res.status(200).json({ message: "Post unliked.", liked: false });
    }

    // Like the post
    const like = await Like.create({
      postId,
      userId,
    });

    res.status(201).json({ message: "Post liked.", liked: true, like });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLikesByPostId = async (req, res) => {
  try {
    const likes = await Like.findAll({
      where: { postId: req.params.postId },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "profileImage"],
        },
      ],
    });

    res.status(200).json({ likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};