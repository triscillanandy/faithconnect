import { hasMany } from './User.js';
import Post, { hasMany as _hasMany } from './post.js';
import Comment from './comment.js';

// Associations
hasMany(Post, { foreignKey: 'userId', as: 'posts' });
hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
_hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

export default { User, Post, Comment };
