// controllers/post/getByIdPost.js
const { Post, Tag, PostMedia, Vote } = require("../../db");
const { Sequelize } = require("sequelize");

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

    if (!post) {
      throw new Error("Post no encontrado");
    }

    return post;
  } catch (error) {
    throw new Error(`Error en getByIdPost: ${error.message}`);
  }
};
