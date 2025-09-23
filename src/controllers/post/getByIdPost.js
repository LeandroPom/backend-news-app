// controllers/post/getByIdPost.js
const { Post } = require("../../db");

module.exports = async (id) => {
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  } catch (error) {
    throw new Error(`Error en getByIdPost: ${error.message}`);
  }
};
