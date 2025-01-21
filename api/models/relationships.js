// Import necessary models
import User from './User.js';
import Post from './Post.js';
import Comment from './comment.js';
import Favorite from './Favorite.js';
import Follower from './Follower.js';
import Message from './Message.js';
import Conversation from './Conversation.js';

// Define relationships
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
User.hasMany(Favorite, { foreignKey: 'userId', as: 'favorites' });
User.hasMany(Follower, { foreignKey: 'followerId', as: 'followers' });
User.hasMany(Follower, { foreignKey: 'followingId', as: 'followings' });
Message.belongsTo(Conversation, { foreignKey: 'conversationId', as: 'conversation' });
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Post.hasMany(Favorite, { foreignKey: 'postId', as: 'favorites' });
// Post model
Post.belongsTo(User, { as: "user", foreignKey: "userId" });

User.hasMany(Message, { foreignKey: 'senderId', as: 'messages' });
// User model
User.hasMany(Post, { as: "posts", foreignKey: "userId" });
Post.hasOne(Devotional, { foreignKey: 'postId', as: 'devotional' });
Post.hasOne(Sermon, { foreignKey: 'postId', as: 'sermon' });

// Export all models as named exports for better modularity
export { User, Post, Comment, Favorite, Follower };
