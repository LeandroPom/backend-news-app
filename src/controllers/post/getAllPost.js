const { Post, Tag, PostMedia, User } = require('../../db'); // ajusta la ruta

module.exports = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'user_name', 'mail'] // ocultamos password
        },
        {
          model: Tag,
          attributes: ['tag_id', 'tag_name'],
          through: { attributes: [] } // oculta tabla intermedia
        },
        {
          model: PostMedia,
          attributes: ['media_id', 'url', 'type']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error('❌ Error en getAllPosts:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};
