// handlers/post/votePostHandler.js
const votePost = require("../../controllers/post/votePost");

module.exports = async (req, res) => {
  try {
    const { post_id, user_id, vote_type } = req.body;

    const updatedPost = await votePost({ post_id, user_id, vote_type });

    return res.status(200).json({
      message: "Voto registrado correctamente",
      post: updatedPost,
    });
  } catch (error) {
    console.error("❌ Error en votePostHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
