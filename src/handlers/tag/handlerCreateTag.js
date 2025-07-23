const createTag = require('../../controllers/tag/createTag');

module.exports = async (req, res) => {
  
  const { name } = req.body;

  try {
  
    const newTag = await createTag(name);
  
    res.status(201).json(newTag);
  
  } catch (error) {
  
    res.status(400).json({ error: error.message });
  }
};
