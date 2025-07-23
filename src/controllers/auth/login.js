const { User } = require('../../db');
const bcrypt = require('bcrypt');

module.exports = async ({ email, password }) => {

  const user = await User.findOne({ where: { email } });
  
  if (!user) throw new Error("Usuario no encontrado");
  
  if (user.blocked) throw new Error("Usuario bloqueado");

  const validPass = await bcrypt.compare(password, user.password);
  
  if (!validPass) throw new Error("Contraseña incorrecta");

  return {
  
    message: 'Inicio de sesión exitoso',
    user: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role
    }
    // En el futuro agregaremos aquí el token JWT
  };
};

