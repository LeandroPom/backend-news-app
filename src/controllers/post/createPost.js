// controllers/post/createPost.js
const { Post, Tag, PostMedia } = require("../../db");
const { Sequelize } = require("sequelize");

module.exports = async ({ headLine, lead, body, conclusion, tags, media, user_id }) => {
  try {
    // ✅ Validación de datos obligatorios
    if (!headLine || !lead || !body || !user_id) {
      throw new Error("Faltan datos obligatorios");
    }

    // ✅ Crear post
    const newPost = await Post.create({
      headLine,
      lead,
      body,
      conclusion,
      user_id,
    });

    // ✅ Asociar Tags (si se mandan)
    if (tags && tags.length > 0) {
      const tagInstances = await Tag.findAll({ where: { tag_id: tags } });
      await newPost.addTags(tagInstances);
    }

    // ✅ Asociar Media (si se manda)
    if (media && media.length > 0) {
      const mediaInstances = media.map((m) => ({
        url: m.url,
        type: m.type,
        post_id: newPost.post_id,
      }));
      await PostMedia.bulkCreate(mediaInstances);
    }

    // ✅ Volvemos a buscar el post recién creado,
    // con Tags, Media y Ratings incluidos automáticamente
    const createdPost = await Post.findByPk(newPost.post_id, {
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

    return createdPost;
  } catch (error) {
    throw new Error(`Error en createPost: ${error.message}`);
  }
};
