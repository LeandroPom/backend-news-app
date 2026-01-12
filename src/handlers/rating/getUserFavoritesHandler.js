//handlers/rating/getUserFavoritesHandler.js
const getUserFavorites = require("../../controllers/rating/getUserFavorites");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.params;

    const favorites = await getUserFavorites(user_id);

    return res.status(200).json(favorites);
  } catch (error) {
    console.error("❌ Error en getUserFavoritesHandler:", error.message);
    return res.status(400).json({ error: error.message });
  }
};
