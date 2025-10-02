// handlers/post/activePostHandler.js
const toggleActivePost = require("../../controllers/post/activePost");

module.exports = async (req, res) => {
  try {

    const { id } = req.params;
    const { state } = req.body; // opcional, si no se envía se alterna

    const updatedPost = await toggleActivePost(id, state);

    return res.status(200).json({
      message: `✅ Post ${updatedPost.active ? "activado" : "desactivado"} correctamente`,
      post: updatedPost,
    });
    
  } catch (error) {
    console.error("❌ Error en activePostHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
