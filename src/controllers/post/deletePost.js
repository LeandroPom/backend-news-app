const { Post } = require('../../db');

module.exports = async (postId) => {
  const post = await Post.findByPk(postId);
  if (!post) throw new Error('Post no encontrado');

  await post.destroy();
  return { message: 'Post eliminado correctamente' };
};
