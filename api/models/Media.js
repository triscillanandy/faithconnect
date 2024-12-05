import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
//import Post from './Post.js';

class Media extends Model {}

Media.init(
  {
    mediaType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: false,
  }
);

// // Relationships
// Media.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export default Media;
