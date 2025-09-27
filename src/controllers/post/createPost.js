const { Post, Tag, PostMedia } = require("../../db");

module.exports = async ({ headLine, lead, body, conclusion, tags, media, user_id }) => {
  try {
    // ✅ Validación de datos obligatorios
    if (!headLine || !lead || !body || !user_id) {
      throw new Error("Faltan datos obligatorios");
    }

    // ✅ Crear el post base
    const newPost = await Post.create({
      headLine,
      lead,
      body,
      conclusion,
      user_id,
    });

    // ✅ Asociar Tags (si se envían)
    if (tags && tags.length > 0) {
      const tagInstances = await Tag.findAll({ where: { tag_id: tags } });
      await newPost.addTags(tagInstances);
    }

    // ✅ Asociar Medios (si se envían)
    if (media && media.length > 0) {
      const mediaInstances = media.map((m) => ({
        url: m.url,
        type: m.type,
        post_id: newPost.post_id,
      }));
      await PostMedia.bulkCreate(mediaInstances);
    }

    // ✅ Recuperar el post completo con relaciones y ratings virtuales
    const createdPost = await Post.findByPk(newPost.post_id, {
      include: [
        {
          model: Tag,
          attributes: ["tag_id", "tag_name"],
          through: { attributes: [] }, // No mostrar tabla intermedia
        },
        {
          model: PostMedia,
          attributes: ["media_id", "url", "type"],
        },
        {
          association: "Votes", // Incluimos votos para que los virtuales funcionen
          attributes: ["vote_type"],
        },
      ],
    });

    return createdPost;
  } catch (error) {
    throw new Error(`Error en createPost: ${error.message}`);
  }
};
