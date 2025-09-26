// handlers/tag/createTagHandler.js
const createTag = require("../../controllers/tag/createTag");

module.exports = async (req, res) => {
  try {
    const newTag = await createTag(req.body);

    return res.status(201).json({
      message: "Tag creada con éxito",
      tag: newTag,
    });
    
  } catch (error) {
    console.error("❌ Error en createTagHandler:", error);

    if (
      error.message.includes("El nombre de la tag es obligatorio") ||
      error.message.includes("La tag ya existe")
    ) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};
