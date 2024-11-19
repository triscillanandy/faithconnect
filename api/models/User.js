import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

// Define User model

  
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  
  // Password hash hook
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });
  
  User.prototype.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  export default User;
  