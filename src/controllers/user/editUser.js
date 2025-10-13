const { User } = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (user_id, updates) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Usuario no encontrado");

    // ✅ Campos que el usuario puede editar por sí mismo
    const allowedFields = ["user_name", "password", "mail", "profilePic"];

    const fieldsToUpdate = {};

    for (const key of allowedFields) {
      // Solo actualizamos campos válidos que vienen definidos y no nulos
      if (updates[key] !== undefined && updates[key] !== null && updates[key] !== "") {
        fieldsToUpdate[key] = updates[key];
      }
    }

    // 🔒 Hashear nueva contraseña solo si se envía
    if (fieldsToUpdate.password) {
      const salt = bcrypt.genSaltSync(10);
      fieldsToUpdate.password = bcrypt.hashSync(fieldsToUpdate.password, salt);
    }

    // ✅ Actualizar solo los campos enviados
    if (Object.keys(fieldsToUpdate).length > 0) {
      await user.update(fieldsToUpdate);
    }

    // 🔎 Evitar retornar la contraseña
    const userSafe = user.toJSON();
    delete userSafe.password;

    return userSafe;
  } catch (error) {
    throw new Error(`Error en editUser: ${error.message}`);
  }
};
