// handlers/user/deleteUserHandler.js
const deleteUser = require("../../controllers/user/deleteUser");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteUser(id);

    return res.status(200).json(result);

  } catch (error) {

    console.error("❌ Error en deleteUserHandler:", error);
    return res.status(400).json({ error: error.message });
    
  }
};
