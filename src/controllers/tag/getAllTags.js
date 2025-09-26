// controllers/tag/getAllTags.js
const { Tag } = require("../../db");

module.exports = async () => {
  try {
    const tags = await Tag.findAll({
      attributes: ["tag_id", "tag_name"],
    });

    return tags;
    
  } catch (error) {
    throw new Error(`Error en getAllTags: ${error.message}`);
  }
};
