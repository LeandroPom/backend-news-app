// controllers/post/activePost.js
const { Post } = require("../../db");

module.exports = async (post_id, state) => {
  try {
    const post = await Post.findByPk(post_id);
    if (!post) throw new Error("Post no encontrado");

    // ✅ Alternar o establecer estado
    post.active = typeof state === "boolean" ? state : !post.active;

    await post.save();

    return post;
    
  } catch (error) {
    throw new Error(`Error en toggleActivePost: ${error.message}`);
  }
};
