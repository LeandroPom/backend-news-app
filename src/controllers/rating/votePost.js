// controllers/post/votePost.js
const { Post, PostVote } = require("../../db");

module.exports = async ({ post_id, user_id, vote_type }) => {
  try {
    if (!post_id || !user_id || !vote_type) {
      throw new Error("Faltan datos obligatorios: post_id, user_id o vote_type");
    }

    if (!["positive", "negative"].includes(vote_type)) {
      throw new Error("El tipo de voto debe ser 'positive' o 'negative'");
    }

    const post = await Post.findByPk(post_id);
    if (!post) throw new Error("Post no encontrado");

    // Verificar si el usuario ya votó este post
    const existingVote = await PostVote.findOne({ where: { post_id, user_id } });

    if (existingVote) {
      // Si el voto es el mismo → quitar voto
      if (existingVote.vote_type === vote_type) {
        await existingVote.destroy();

        // Actualizar contadores
        if (vote_type === "positive") {
          post.rating_positive = Math.max(0, post.rating_positive - 1);
        } else {
          post.rating_negative = Math.max(0, post.rating_negative - 1);
        }
      } else {
        // Si el voto es diferente → cambiar voto
        if (vote_type === "positive") {
          post.rating_positive += 1;
          post.rating_negative = Math.max(0, post.rating_negative - 1);
        } else {
          post.rating_negative += 1;
          post.rating_positive = Math.max(0, post.rating_positive - 1);
        }
        existingVote.vote_type = vote_type;
        await existingVote.save();
      }
    } else {
      // Si no votó antes → crear voto
      await PostVote.create({ post_id, user_id, vote_type });

      if (vote_type === "positive") {
        post.rating_positive += 1;
      } else {
        post.rating_negative += 1;
      }
    }

    await post.save();

    return post;
  } catch (error) {
    throw new Error(`Error en votePost: ${error.message}`);
  }
};
