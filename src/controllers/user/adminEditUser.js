// controllers/user/adminEditUser.js
const { User } = require("../../db");
const bcrypt = require("bcrypt");

module.exports = async (user_id, updates) => {
  try {
    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Usuario no encontrado");

    const allowedFields = [
      "user_name",
      "password",
      "mail",
      "profilePic",
      "editor",
      "admin",
      "active",
    ];

    const fieldsToUpdate = {};

    for (const key of allowedFields) {
      if (updates[key] !== undefined) {
        fieldsToUpdate[key] = updates[key];
      }
    }

    // 🔒 Hashear nueva contraseña si se cambia
    if (fieldsToUpdate.password) {
      const salt = bcrypt.genSaltSync(10);
      fieldsToUpdate.password = bcrypt.hashSync(fieldsToUpdate.password, salt);
    }

    await user.update(fieldsToUpdate);

    const userSafe = user.toJSON();
    delete userSafe.password;

    return userSafe;
    
  } catch (error) {
    throw new Error(`Error en adminEditUser: ${error.message}`);
  }
};
