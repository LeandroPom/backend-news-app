// controllers/rating/incrementView.js
const { Post, PostView } = require("../../db");

module.exports = async (post_id, user_id) => {
  try {
    // Verificar si ya existe el registro
    const alreadyViewed = await PostView.findOne({
      where: { post_id, user_id },
    });

    if (!alreadyViewed) {
      // Registrar la vista
      await PostView.create({ post_id, user_id });

      // Incrementar contador en Post
      await Post.increment("views", { where: { post_id } });
    }

    // Retornar el post actualizado
    const post = await Post.findByPk(post_id);
    return post;
    
  } catch (error) {
    throw new Error(`Error en incrementView: ${error.message}`);
  }
};
