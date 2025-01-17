import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js'; // adjust the path to your Sequelize instance
import User from './User.js';


class Message extends Model {}

Message.init(
  {
    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Used for group messages
      references: {
        model: 'groups',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    timestamps: true,
  }
);

// Define associations after all models are imported
Message.belongsTo(User, { foreignKey: 'sender', as: 'user' });


export default Message;
