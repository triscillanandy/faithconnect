import { DataTypes, Model, Sequelize } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';
import Media from './Media.js';

class Post extends Model {}

Post.init(
  {
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSONB, // JSONB is for PostgreSQL; for MySQL use JSON
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: false,
  }
);

// Relationships
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Post.hasMany(Media, { foreignKey: 'postId', as: 'media' });

export default Post;
