//handlers/rating/markAsFavoriteHandler.js
const markAsFavorite = require("../../controllers/rating/markAsFavorite");

module.exports = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;

    const response = await markAsFavorite({ user_id, post_id });

    return res.status(200).json(response);
  } catch (error) {
    console.error("❌ Error en markAsFavoriteHandler:", error.message);
    return res.status(400).json({ error: error.message });
  }
};
