const { User } = require('../../db');

module.exports = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('Usuario no encontrado');

  await user.update(updates);
  return user;
};
