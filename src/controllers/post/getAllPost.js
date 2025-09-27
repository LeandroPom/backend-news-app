// controllers/post/getAllPosts.js
const { Post, Tag, PostMedia, User } = require("../../db");

module.exports = async () => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["user_id", "user_name", "mail"], // ocultamos password
        },
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
          association: "Votes", // Incluimos votos para habilitar los virtuales
          attributes: ["vote_type"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return posts;
  } catch (error) {
    throw new Error(`Error en getAllPosts: ${error.message}`);
  }
};
