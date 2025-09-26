// handlers/post/createPostHandler.js
const createPost = require("../../controllers/post/createPost");

module.exports = async (req, res) => {
  try {
    const newPost = await createPost(req.body);

    return res.status(201).json({
      message: "Post creado con éxito",
      post: newPost,
    });

  } catch (error) {

    console.error("❌ Error en createPostHandler:", error);

    if (error.message.includes("Faltan datos obligatorios")) {
      return res.status(400).json({ error: error.message });
    }
    
    return res.status(500).json({ error: error.message });
  }
};
