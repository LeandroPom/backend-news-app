// handlers/user/editUserHandler.js
const editUser = require("../../controllers/user/editUser");

module.exports = async (req, res) => {
  try {
    
    const { id } = req.params;

    const updatedUser = await editUser(id, req.body);

    return res.status(200).json({
      message: "✅ Usuario actualizado correctamente",
      user: updatedUser,
    });

  } catch (error) {
    console.error("❌ Error en editUserHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
