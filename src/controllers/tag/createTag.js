// controllers/tag/createTag.js
const { Tag } = require("../../db");

module.exports = async ({ tag_name }) => {
  try {
    if (!tag_name) {
      throw new Error("El nombre de la tag es obligatorio");
    }

    // Evitar duplicados
    const existingTag = await Tag.findOne({ where: { tag_name } });
    if (existingTag) {
      throw new Error("La tag ya existe");
    }

    const newTag = await Tag.create({ tag_name });
    return newTag;
  } catch (error) {
    throw new Error(`Error en createTag: ${error.message}`);
  }
};
