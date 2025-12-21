// handlers/premium/createPremiumHandler.js
const createPremium = require("../../controllers/premium/createPremium");

module.exports = async (req, res) => {
  try {
    const { user_id, days } = req.body;

    const premium = await createPremium({ user_id, days });

    res.status(201).json({
      message: "Premium creado correctamente",
      premium,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
