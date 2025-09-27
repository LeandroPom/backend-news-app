// controllers/post/getByNamePost.js
const { Post, Tag, PostMedia } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (name) => {
  try {
    const posts = await Post.findAll({
      where: {
        headLine: {
          [Op.iLike]: `%${name}%`,
        },
      },
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

    if (!posts.length) {
      throw new Error("No se encontraron posts con ese nombre");
    }

    return posts;
  } catch (error) {
    throw new Error(`Error en getByNamePost: ${error.message}`);
  }
};
