// controllers/post/getAllPosts.js
const { Post, Tag, PostMedia, User } = require("../../db");
const { Sequelize } = require("sequelize");

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
      order: [["createdAt", "DESC"]],
    });

    return posts;
  } catch (error) {
    throw new Error(`Error en getAllPosts: ${error.message}`);
  }
};
