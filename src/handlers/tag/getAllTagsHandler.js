// handlers/tag/getAllTagsHandler.js
const getAllTags = require("../../controllers/tag/getAllTags");

module.exports = async (req, res) => {
  try {

    const tags = await getAllTags();

    return res.status(200).json(tags);

  } catch (error) {

    console.error("❌ Error en getAllTagsHandler:", error);
    return res.status(500).json({ error: error.message });

  }
};
