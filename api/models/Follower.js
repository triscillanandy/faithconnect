
import { sequelize } from '../config/database.js';
class Follower extends Model {}

Follower.init(
  {},
  {
    sequelize,
    modelName: 'Follower',
    tableName: 'followers',
    timestamps: false,
  }
);

// Relationships
Follower.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followingId', as: 'following' });
