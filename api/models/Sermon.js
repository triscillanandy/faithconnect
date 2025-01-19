import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';
import Post from './Post.js';


class Sermon extends Model {}

Sermon.init(
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
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preacher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Sermon',
    tableName: 'sermons',
    timestamps: false,
  }
);

// Relationships

Sermon.belongsTo(Post, { foreignKey: 'postId', as: 'post' });


export default Sermon ;
