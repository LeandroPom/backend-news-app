// handlers/premium/renewPremiumHandler.js
const renewPremium = require("../../controllers/premium/renewPremium");

module.exports = async (req, res) => {
  try {
    const { user_id, days } = req.body;

    const premium = await renewPremium({ user_id, days });

    res.status(200).json({
      message: "Premium renovado correctamente",
      premium,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
