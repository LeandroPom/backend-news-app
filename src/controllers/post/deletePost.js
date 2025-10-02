// controllers/post/deletePost.js
const { Post } = require("../../db");

module.exports = async (post_id) => {
  try {
    
    const post = await Post.findByPk(post_id);
    if (!post) throw new Error("Post no encontrado");

    await post.destroy();

    return { message: "✅ Post eliminado correctamente" };

  } catch (error) {
    throw new Error(`Error en deletePost: ${error.message}`);
  }
};
