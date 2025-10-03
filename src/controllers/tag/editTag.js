// controllers/tag/editTag.js
const { Tag } = require("../../db");

module.exports = async (tag_id, updates) => {
  try {
    
    const tag = await Tag.findByPk(tag_id);
    if (!tag) throw new Error("Etiqueta no encontrada");

    // ✅ Solo se puede modificar el nombre
    if (!updates.tag_name) {
      throw new Error("Debe proporcionar un nuevo nombre para la etiqueta");
    }

    // 🔍 Validar duplicados
    const existingTag = await Tag.findOne({ where: { tag_name: updates.tag_name } });
    if (existingTag && existingTag.tag_id !== tag_id) {
      throw new Error("Ya existe una etiqueta con ese nombre");
    }

    // ✏️ Actualizar nombre
    await tag.update({ tag_name: updates.tag_name });

    return tag;

  } catch (error) {
    throw new Error(`Error en editTag: ${error.message}`);
  }
};
