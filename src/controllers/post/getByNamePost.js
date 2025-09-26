// controllers/post/getByNamePost.js
const { Post, Tag, PostMedia } = require("../../db");
const { Sequelize, Op } = require("sequelize");

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
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Votes" AS v
              WHERE v."post_id" = "Post"."post_id"
              AND v."vote_type" = 'positive'
            )`),
            "rating_positive",
          ],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Votes" AS v
              WHERE v."post_id" = "Post"."post_id"
              AND v."vote_type" = 'negative'
            )`),
            "rating_negative",
          ],
        ],
      },
    });

    if (!posts.length) {
      throw new Error("No se encontraron posts con ese nombre");
    }

    return posts;
  } catch (error) {
    throw new Error(`Error en getByNamePost: ${error.message}`);
  }
};
