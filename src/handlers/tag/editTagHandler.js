// handlers/tag/editTagHandler.js
const editTag = require("../../controllers/tag/editTag");

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // /tags/:id
    const { tag_name } = req.body;

    const updatedTag = await editTag(id, { tag_name });

    return res.status(200).json({
      message: "✅ Etiqueta actualizada correctamente",
      tag: updatedTag,
    });
    
  } catch (error) {
    console.error("❌ Error en editTagHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
