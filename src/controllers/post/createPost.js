const { Post, Tag, Media } = require('../../db');

module.exports = async (data, userId) => {
  const { headline, lead, body, conclusion, tags, media } = data;

  const newPost = await Post.create({
    headline,
    lead,
    body,
    conclusion,
    authorId: userId
  });

  // Asignar Tags
  if (Array.isArray(tags) && tags.length) {
    const foundTags = await Tag.findAll({ where: { name: tags } });
    await newPost.addTags(foundTags);
  }

  // Agregar Media
  if (Array.isArray(media) && media.length) {
    const formattedMedia = media.map(m => ({
      ...m,
      postId: newPost.post_id
    }));
    await Media.bulkCreate(formattedMedia);
  }

  return newPost;
};
