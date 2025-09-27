// controllers/post/getByIdPost.js
const { Post, Tag, PostMedia } = require("../../db");

module.exports = async (id) => {
  try {
    const post = await Post.findByPk(id, {
      include: [
        {
          model: Tag,
          attributes: ["tag_id", "tag_name"],
          through: { attributes: [] },
        },
        {
          model: PostMedia,
          attributes: ["media_id", "url", "type"],
        },
        {
          association: "Votes",
          attributes: ["vote_type"],
        },
      ],
    });

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  } catch (error) {
    throw new Error(`Error en getByIdPost: ${error.message}`);
  }
};
