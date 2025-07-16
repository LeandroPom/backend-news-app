const updatePost = require('../../controllers/post/updatePost');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await updatePost(id, req.body);
    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
