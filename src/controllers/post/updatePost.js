const { Post, Tag, Media } = require('../../db');

module.exports = async (postId, data) => {
  const { headline, lead, body, conclusion, tags, media } = data;

  const post = await Post.findByPk(postId);
  if (!post) throw new Error('Post no encontrado');

  await post.update({ headline, lead, body, conclusion });

  // Tags
  if (Array.isArray(tags)) {
    const foundTags = await Tag.findAll({ where: { name: tags } });
    await post.setTags(foundTags);
  }

  // Media
  if (Array.isArray(media)) {
    await Media.destroy({ where: { postId } });
    const formattedMedia = media.map(m => ({ ...m, postId }));
    await Media.bulkCreate(formattedMedia);
  }

  return post;
};
