// controllers/post/editPost.js
const { Post } = require("../../db");

module.exports = async (post_id, updates) => {
  try {
    const post = await Post.findByPk(post_id);
    if (!post) throw new Error("Post no encontrado");

    // ✅ Campos permitidos
    const allowedFields = ["headLine", "lead", "body", "conclusion"];
    const fieldsToUpdate = {};

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fieldsToUpdate[key] = updates[key];
      }
    }

    // ✅ Validaciones mínimas
    if (fieldsToUpdate.headLine && fieldsToUpdate.headLine.trim() === "") {
      throw new Error("El título no puede estar vacío");
    }
    if (fieldsToUpdate.lead && fieldsToUpdate.lead.trim() === "") {
      throw new Error("El subtítulo no puede estar vacío");
    }

    // ✅ Actualizar post
    await post.update(fieldsToUpdate);

    return post;
    
  } catch (error) {
    throw new Error(`Error en editPost: ${error.message}`);
  }
};
