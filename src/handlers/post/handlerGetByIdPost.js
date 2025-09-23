// handlers/post/handlerGetByIdPost.js
const getByIdPost = require("../../controllers/post/getByIdPost");

module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await getByIdPost(id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
