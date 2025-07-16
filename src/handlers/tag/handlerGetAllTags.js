const getAllTags = require('../../controllers/tag/getAllTags');

module.exports = async (req, res) => {
  try {
    const tags = await getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
