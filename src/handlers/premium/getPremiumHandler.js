// handlers/premium/getPremiumHandler.js
const getPremium = require("../../controllers/premium/getPremium");

module.exports = async (req, res) => {
  try {
    const { user_id, premium_id } = req.query;

    const premium = await getPremium({ user_id, premium_id });

    res.status(200).json(premium);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
