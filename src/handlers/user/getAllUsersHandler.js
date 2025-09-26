// handlers/user/getAllUsersHandler.js
const getAllUsers = require("../../controllers/user/getAllUsers");

module.exports = async (req, res) => {
  try {

    const users = await getAllUsers();

    return res.status(200).json(users);

  } catch (error) {

    console.error("❌ Error en getAllUsersHandler:", error);
    return res.status(500).json({ error: error.message });
    
  }
};
