// controllers/tag/deleteTag.js
const { Tag } = require("../../db");

module.exports = async (tag_id) => {
  try {
    
    const tag = await Tag.findByPk(tag_id);
    if (!tag) throw new Error("Etiqueta no encontrada");

    await tag.destroy();

    return { message: "✅ Etiqueta eliminada correctamente" };

  } catch (error) {
    throw new Error(`Error en deleteTag: ${error.message}`);
  }
};
