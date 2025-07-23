const getPopularPosts = require('../../controllers/post/getPopularPosts');

module.exports = async (req, res) => {
  try {
    const posts = await getPopularPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
