// handlers/user/adminEditUserHandler.js
const adminEditUser = require("../../controllers/user/adminEditUser");

module.exports = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedUser = await adminEditUser(id, req.body);

    return res.status(200).json({
      message: "✅ Usuario actualizado por administrador",
      user: updatedUser,
    });

  } catch (error) {
    console.error("❌ Error en adminEditUserHandler:", error);
    
    return res.status(400).json({ error: error.message });

  }
};
