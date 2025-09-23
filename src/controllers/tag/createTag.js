const { Tag } = require('../../db'); 

module.exports = async (req, res) => {
  try {
    const { tag_name } = req.body;

    if (!tag_name) {
      return res.status(400).json({ error: 'El nombre de la tag es obligatorio' });
    }

    // Evitar duplicados
    const existingTag = await Tag.findOne({ where: { tag_name } });
    if (existingTag) {
      return res.status(400).json({ error: 'La tag ya existe' });
    }

    const newTag = await Tag.create({ tag_name });

    return res.status(201).json({
      message: 'Tag creada con éxito',
      tag: newTag
    });
  } catch (error) {
    console.error('❌ Error en createTag:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
