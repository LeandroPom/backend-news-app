// handlers/post/addViewHandler.js
const addView = require("../../controllers/rating/addView");

module.exports = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    if (!post_id || !user_id) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const post = await addView(post_id, user_id);
    
    return res.status(200).json(post);

  } catch (error) {
    
    console.error("❌ Error en addViewHandler:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};
