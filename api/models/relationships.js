// Import necessary models
import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Favorite from './Favorite.js';
import Follower from './Follower.js';

// Define relationships
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
User.hasMany(Follower, { foreignKey: 'followerId', as: 'followers' });
User.hasMany(Follower, { foreignKey: 'followingId', as: 'followings' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Favorite, { foreignKey: 'postId', as: 'favorites' });

// Export all models as named exports for better modularity
export { User, Post, Comment, Favorite, Follower };
