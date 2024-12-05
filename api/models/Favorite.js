class Favorite extends Model {}

Favorite.init(
  {},
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites',
    timestamps: false,
  }
);

// Relationships
Favorite.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Favorite.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
