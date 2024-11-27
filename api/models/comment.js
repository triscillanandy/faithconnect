class Comment extends Model {}

Comment.init(
  {
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false,
  }
);

// Relationships
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' }); // One-to-many relationship
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // One-to-many relationship

export default Comment;
