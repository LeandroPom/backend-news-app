// controllers/user/getByIdUser.js
const { User } = require("../../db");

module.exports = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] } // ocultamos la contraseña
    });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return user;
  } catch (error) {
    throw new Error(`Error en getByIdUser: ${error.message}`);
  }
};
