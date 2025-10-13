// handlers/user/activeUserHandler.js
const activeUser = require("../../controllers/user/activeUser");

module.exports = async (req, res) => {
  try {

    const { id } = req.params;
    const { state } = req.body; // opcional

    const updatedUser = await activeUser(id, state);

    return res.status(200).json({
      message: `✅ Usuario ${updatedUser.active ? "activado" : "desactivado"} correctamente`,
      user: updatedUser,
    });

  } catch (error) {

    console.error("❌ Error en activeUserHandler:", error);
    return res.status(400).json({ error: error.message });
    
  }
};
