// handlers/post/getAllPostsHandler.js
const getAllPosts = require("../../controllers/post/getAllPost");

module.exports = async (req, res) => {
  try {

    const posts = await getAllPosts();
    
    return res.status(200).json(posts);

  } catch (error) {

    console.error("❌ Error en getAllPostsHandler:", error);
    return res.status(500).json({ error: error.message });

  }
};
