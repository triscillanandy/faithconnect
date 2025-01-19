import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import Post from './Post.js';

class Devotional extends Model {}

Devotional.init(
  {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Post,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    readingPlan: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Devotional',
    tableName: 'devotionals',
    timestamps: false,
  }
);


// Relationships
Devotional.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

export default Devotional;

