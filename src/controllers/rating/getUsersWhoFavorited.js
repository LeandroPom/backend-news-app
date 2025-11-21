//controllers/rating/getUsersWhoFavorited.js
const { Post, User } = require("../../db");

module.exports = async (post_id) => {
  if (!post_id) throw new Error("Falta el post_id");

  const post = await Post.findByPk(post_id, {
    include: {
      model: User,
      as: "UsersWhoFavorited",
      through: { attributes: [] },
      attributes: ["user_id", "user_name", "mail"],
    },
  });

  if (!post) throw new Error("Post no encontrado");

  return post.UsersWhoFavorited;
};
