const bcrypt = require('bcrypt');
const { User } = require('../../db'); 

module.exports = async (req, res) => {
  try {
    const { user_name, mail, password } = req.body;

    // Validaciones básicas
    if (!user_name || !mail || !password) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Verificar si ya existe el mail
    const existingUser = await User.findOne({ where: { mail } });
    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      user_name,
      mail,
      password: hashedPassword,
      active: true
    });

    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        user_id: newUser.user_id,
        user_name: newUser.user_name,
        mail: newUser.mail
      }
    });
  } catch (error) {
    console.error('❌ Error en register:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
