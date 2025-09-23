const { Post, Tag, PostMedia } = require('../../db');

module.exports = async (req, res) => {
  try {
    const { headLine, lead, body, conclusion, tags, media, user_id } = req.body;

    if (!headLine || !lead || !body || !user_id) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // Crear post
    const newPost = await Post.create({
      headLine,
      lead,
      body,
      conclusion,
      user_id
    });

    // Asociar Tags (si se mandan)
    if (tags && tags.length > 0) {
      const tagInstances = await Tag.findAll({ where: { tag_id: tags } });
      await newPost.addTags(tagInstances);
    }

    // Asociar Media (si se manda)
    if (media && media.length > 0) {
      const mediaInstances = media.map(m => ({
        url: m.url,
        type: m.type,
        post_id: newPost.post_id
      }));
      await PostMedia.bulkCreate(mediaInstances);
    }

    return res.status(201).json({
      message: 'Post creado con éxito',
      post: newPost
    });
  } catch (error) {
    console.error('❌ Error en createPost:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
