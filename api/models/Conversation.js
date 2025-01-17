import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js'; // adjust the path to your Sequelize instance
import Message from './Message.js'; // Import Message model to avoid circular dependency

class Conversation extends Model {}
Conversation.init(
  {
    userIds: {
      type: DataTypes.ARRAY(DataTypes.STRING), // For direct conversations
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM('direct', 'group'),
      defaultValue: 'direct',
      allowNull: false,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'groups', // The Group table
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Conversation',
    tableName: 'conversations',
    timestamps: true,
  }
);

// Associations should be done after models are initialized
Conversation.hasMany(Message, { foreignKey: 'conversationId', as: 'messages' });

export default Conversation;
