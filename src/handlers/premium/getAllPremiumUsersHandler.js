// handlers/get/getAllPremiumUsersHandler.js
const getAllPremiumUsers = require("../../controllers/premium/getAllPremiumUsers");

module.exports = async (req, res) => {
  try {
    const data = await getAllPremiumUsers();

    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error en getAllPremiumUsersHandler:", err);
    return res.status(400).json({ error: err.message });
  }
};
