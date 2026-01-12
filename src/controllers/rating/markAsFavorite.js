//controllers/rating/markAsFavorite.js
const { Favorite, User, Post } = require("../../db");

module.exports = async ({ user_id, post_id }) => {
  if (!user_id || !post_id) {
    throw new Error("Faltan datos obligatorios: user_id y post_id");
  }

  // Verificar existencia del usuario y del post
  const user = await User.findByPk(user_id);
  if (!user) throw new Error("Usuario no encontrado");

  const post = await Post.findByPk(post_id);
  if (!post) throw new Error("Post no encontrado");

  // Buscar si ya existe el favorito
  const existingFavorite = await Favorite.findOne({
    where: { user_id, post_id },
  });

  // Toggle
  if (existingFavorite) {
    await existingFavorite.destroy();
    return { message: "Post removido de favoritos", isFavorite: false };
  }

  const newFavorite = await Favorite.create({ user_id, post_id });
  return { message: "Post agregado a favoritos", isFavorite: true, favorite: newFavorite };
};
