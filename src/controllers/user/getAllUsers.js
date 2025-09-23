const { User } = require('../../db'); // ajusta el path según tu proyecto

module.exports = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'user_id',
        'user_name',
        'mail',       // ✅ Si quieres ocultar el mail, elimina esta línea
        'active',
        'admin',
        'editor',
        'premium',
        'profilePic',
        'createdAt'
      ]
    });

    return res.status(200).json(users);
  } catch (error) {
    console.error('❌ Error en getAllUsers:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
