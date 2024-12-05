import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import { sequelize } from '../config/database.js';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'username',
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'date_of_birth',
      validate: {
        isDate: true,
        isBefore: new Date().toISOString(),
      },
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'profile_image',
    },
    preferences: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    sequelize,  // Pass the sequelize instance
    modelName: 'User',
    tableName: 'users',  // Define the table name
    timestamps: true,    // Automatically manage `createdAt` and `updatedAt`
  }
);

// Password hash hook
User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

User.prototype.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default User;
