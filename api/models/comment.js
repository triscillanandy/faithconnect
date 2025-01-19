import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js'; 
import Post from './Post.js';
import User from './User.js';

class Comment extends Model {}
Comment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'id',
    },
  },
}, { 
  sequelize,
    modelName: 'Comment',
    tableName: 'Comment',
    timestamps: true,
});

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Comment;
//ekds
//ss