const { Tag } = require('../../db'); 

module.exports = async (req, res) => {
  try {
    const tags = await Tag.findAll({
      attributes: ['tag_id', 'tag_name']
    });

    return res.status(200).json(tags);
  } catch (error) {
    console.error('❌ Error en getAllTags:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
