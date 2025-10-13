const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../db'); 

module.exports = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Buscar usuario
    const user = await User.findOne({ where: { mail } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        mail: user.mail,
        profilePic: user.profilePic,
        active: user.active,
        roles: {
          admin: user.admin,
          editor: user.editor,
          premium: user.premium
        }
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // el token expira en 1 hora
    );

    return res.status(200).json({
      message: 'Login exitoso',
      token
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
