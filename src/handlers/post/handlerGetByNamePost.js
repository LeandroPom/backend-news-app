// handlers/post/handlerGetByNamePost.js
const getByNamePost = require("../../controllers/post/getByNamePost");

module.exports = async (req, res) => {
  const { name } = req.query;

  try {
    if (!name) {
      return res.status(400).json({ error: "Debe proporcionar un nombre para buscar" });
    }

    const posts = await getByNamePost(name);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};
