// handlers/post/editPostHandler.js
const editPost = require("../../controllers/post/editPost");

module.exports = async (req, res) => {
  try {

    const { id } = req.params;
    
    const updatedPost = await editPost(id, req.body);

    return res.status(200).json({
      message: "✅ Post actualizado correctamente",
      post: updatedPost,
    });

  } catch (error) {
    console.error("❌ Error en editPostHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
