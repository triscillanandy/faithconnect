import { DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    field:'username',
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,  // This will store as YYYY-MM-DD
    allowNull: false,
    field:'date_of_birth',
    validate: {
      isDate: true,
      isBefore: new Date().toISOString() // Ensures date is not in the future
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
  profileImage: {
    type: DataTypes.STRING, // Store filename or relative path
    allowNull: true,
    field: 'profile_image',
  },
  
  preferences: {
    type: DataTypes.JSON, // Use JSON to store user preferences
    allowNull: true,
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
