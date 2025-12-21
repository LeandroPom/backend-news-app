// handlers/premium/getAllPremiumUsersHandler.js
const getAllPremiumUsers = require("../../controllers/premium/getAllPremiumUsers");

module.exports = async (req, res) => {
  try {
    const premiums = await getAllPremiumUsers();
    res.status(200).json(premiums);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
