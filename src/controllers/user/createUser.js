const { User } = require('../../db');

module.exports = async ( name, email, password, role ) => {

  if (!name || !email || !password) throw new Error('Faltan datos obligatorios');

  const existing = await User.findOne({ where: { email } });

  if (existing) throw new Error('Ya existe un usuario con ese correo');

  const newUser = await User.create({
    name,
    email,
    password, // 🔐 ideal encriptar luego
    role: role || 'user',
    blocked: false
  });

  return newUser;
};
