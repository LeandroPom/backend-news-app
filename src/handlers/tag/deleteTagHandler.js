// handlers/tag/deleteTagHandler.js
const deleteTag = require("../../controllers/tag/deleteTag");

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // /tags/:id

    const result = await deleteTag(id);

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error en deleteTagHandler:", error);
    return res.status(400).json({ error: error.message });
    
  }
};
