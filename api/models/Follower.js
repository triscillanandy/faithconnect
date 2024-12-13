import { sequelize } from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import User from './User.js';

class Follower extends Model {}

Follower.init(
  {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id', // Assuming `id` is the primary key in the User table
      },
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Follower',
    tableName: 'followers',
    timestamps: false, // You can enable timestamps if needed
  }
);

// Define Relationships
Follower.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingId', as: 'following' });

export default Follower;
