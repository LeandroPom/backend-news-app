// controllers/user/activeUser.js
const { User } = require("../../db");

module.exports = async (user_id, state) => {
  try {
    
    const user = await User.findByPk(user_id);
    if (!user) throw new Error("Usuario no encontrado");

    user.active = typeof state === "boolean" ? state : !user.active;

    await user.save();

    return user;

  } catch (error) {
    throw new Error(`Error en activeUser: ${error.message}`);
  }
};
