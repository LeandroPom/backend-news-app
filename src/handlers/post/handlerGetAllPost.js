const getAllPosts = require('../../controllers/post/getAllposts');

module.exports = async (req, res) => {
  try {
    const result = await getAllPosts(req.query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
