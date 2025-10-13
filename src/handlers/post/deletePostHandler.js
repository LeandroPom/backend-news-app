// handlers/post/deletePostHandler.js
const deletePost = require("../../controllers/post/deletePost");

module.exports = async (req, res) => {
  try {
    
    const { id } = req.params;

    const result = await deletePost(id);

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error en deletePostHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
