// handlers/post/createPremiumHandler.js
const createPremium = require("../../controllers/premium/createPremium");

module.exports = async (req, res) => {
  try {
    const { user_id } = req.body;

    const premium = await createPremium({ user_id });

    return res.status(201).json({
      message: "Premium creado correctamente",
      premium,
    });
  } catch (err) {
    console.error("❌ Error en createPremiumHandler:", err);
    return res.status(400).json({ error: err.message });
  }
};
