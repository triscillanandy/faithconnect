class Post extends Model {}

Post.init(
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Use an array for images
    },
    lang: {
      type: DataTypes.STRING,
      defaultValue: "EN",
    },
    createdAt: {
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
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // One-to-many relationship
export default Post;
