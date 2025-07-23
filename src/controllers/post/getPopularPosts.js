const { Post, User } = require('../../db');

module.exports = async () => {
  const posts = await Post.findAll({
    order: [['views', 'DESC']],
    include: {
      model: User,
      attributes: ['user_id', 'name', 'email']
    }
  });

  return posts;
};
