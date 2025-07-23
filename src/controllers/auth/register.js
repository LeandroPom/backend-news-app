const { User } = require('../../db');
const bcrypt = require('bcrypt');

module.exports = async ({ name, email, password }) => {

  if (!name || !email || !password) throw new Error("Faltan campos");

  const existing = await User.findOne({ where: { email } });

  if (existing) throw new Error("El email ya está registrado");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    blocked: false
  });

  return {
    message: 'Usuario registrado correctamente',
    user: {
      user_id: newUser.user_id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    }
  };
};
 