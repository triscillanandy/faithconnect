class Media extends Model {}

Media.init(
  {
    mediaType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mediaUrl: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Media',
    tableName: 'media',
    timestamps: false,
  }
);

// Relationships
Media.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
