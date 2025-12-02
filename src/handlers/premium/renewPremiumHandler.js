// handlers/put/renewPremiumHandler.js
const renewPremium = require("../../controllers/premium/renewPremium");

module.exports = async (req, res) => {
  try {
    const { user_id, premium_id } = req.body;

    const premium = await renewPremium({ user_id, premium_id });

    return res.status(200).json({
      message: "Premium renovado correctamente",
      premium,
    });
  } catch (err) {
    console.error("❌ Error en renewPremiumHandler:", err);
    return res.status(400).json({ error: err.message });
  }
};
