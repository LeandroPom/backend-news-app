const { User } = require('../../db');

module.exports = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  await user.destroy(); // 🔥 Elimina definitivamente
  return { message: 'Usuario eliminado permanentemente' };
};
