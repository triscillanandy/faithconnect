import { sequelize } from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
 // Adjust the path to your database configuration



class Group extends Model {}
Group.init({


  group_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  visibility: {
    type: DataTypes.ENUM('public', 'private'),
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {

    sequelize,
    modelName: 'Group',
    tableName: 'groups',
  timestamps: true,
});

export default Group;
