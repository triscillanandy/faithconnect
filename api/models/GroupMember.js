import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database.js';




class GroupMember extends Model { }
GroupMember.init({
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'member'),
        defaultValue: 'member',
        allowNull: false,
    },
}, {

    sequelize,
    modelName: 'GroupMember',
    tableName: 'groupmembers',
    timestamps: true,
    createdAt: 'joined_at',
    updatedAt: false,
});

export default GroupMember;
