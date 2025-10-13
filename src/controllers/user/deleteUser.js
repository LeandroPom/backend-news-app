// controllers/user/deleteUser.js
const { User } = require("../../db");

module.exports = async (user_id) => {
  try {

    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Usuario no encontrado");

    await user.destroy();

    return { message: "✅ Usuario eliminado correctamente" };
    
  } catch (error) {
    throw new Error(`Error en deleteUser: ${error.message}`);
  }
};
