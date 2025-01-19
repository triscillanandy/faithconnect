import { DataTypes, Model  } from 'sequelize';
import { sequelize } from '../config/database.js'; 
import Post from './Post.js';
import User from './User.js';


class Like extends Model {}
Like.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
}, {  sequelize,
    modelName: 'Like',
    tableName: 'Like',
    timestamps: true, });

Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Like;
