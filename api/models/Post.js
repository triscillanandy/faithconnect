class Post extends Model {}

Post.init(
  {
    creationDate: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts',
    timestamps: false,
  }
);

// Relationships
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Post;
