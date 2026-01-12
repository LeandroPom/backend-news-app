//handlers/rating/getUsersWhoFavoritedHandler.js
const getUsersWhoFavorited = require("../../controllers/rating/getUsersWhoFavorited");

module.exports = async (req, res) => {
  try {
    const { post_id } = req.params;

    const users = await getUsersWhoFavorited(post_id);

    return res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error en getUsersWhoFavoritedHandler:", error.message);
    return res.status(400).json({ error: error.message });
  }
};
