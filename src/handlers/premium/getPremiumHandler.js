// handlers/get/getPremiumHandler.js
const getPremium = require("../../controllers/premium/getPremium");

module.exports = async (req, res) => {
  try {
    const { user_id, premium_id } = req.query;

    const premium = await getPremium({ user_id, premium_id });

    return res.status(200).json(premium);
  } catch (err) {
    console.error("❌ Error en getPremiumHandler:", err);
    return res.status(400).json({ error: err.message });
  }
};
