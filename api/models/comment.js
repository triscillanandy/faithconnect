class Comment extends Model {}

Comment.init(
  {
    comment: {
      type: DataTypes.STRING(400),
      allowNull: false,
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
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });


export default Comment;
