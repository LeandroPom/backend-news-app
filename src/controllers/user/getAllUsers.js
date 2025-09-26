// controllers/user/getAllUsers.js
const { User } = require("../../db");

module.exports = async () => {
  try {
    const users = await User.findAll({
      attributes: [
        "user_id",
        "user_name",
        "mail",       // ❌ Si no quieres mostrarlo, elimina esta línea
        "active",
        "admin",
        "editor",
        "premium",
        "profilePic",
        "createdAt"
      ]
    });

    return users;
  } catch (error) {
    throw new Error(`Error en getAllUsers: ${error.message}`);
  }
};
