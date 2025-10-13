const { User } = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (user_id, updates) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Usuario no encontrado");

    // ✅ Campos que un administrador puede editar
    const allowedFields = [
      "user_name",
      "password",
      "mail",
      "profilePic",
      "editor",
      "admin",
      "active",
      "premium"
    ];

    const fieldsToUpdate = {};

    for (const key of allowedFields) {
      // Evitar sobreescrituras vacías
      if (updates[key] !== undefined && updates[key] !== null && updates[key] !== "") {
        fieldsToUpdate[key] = updates[key];
      }
    }

    // 🔒 Hashear contraseña si se cambia
    if (fieldsToUpdate.password) {
      const salt = bcrypt.genSaltSync(10);
      fieldsToUpdate.password = bcrypt.hashSync(fieldsToUpdate.password, salt);
    }

    // ✅ Solo actualiza si hay cambios
    if (Object.keys(fieldsToUpdate).length > 0) {
      await user.update(fieldsToUpdate);
    }

    const userSafe = user.toJSON();
    delete userSafe.password;

    return userSafe;
  } catch (error) {
    throw new Error(`Error en adminEditUser: ${error.message}`);
  }
};
