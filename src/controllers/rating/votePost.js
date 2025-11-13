// controllers/post/votePost.js
const { Post, PostVote } = require("../../db");

module.exports = async ({ post_id, user_id, vote_type }) => {
  try {
    // ------------------ VALIDACIONES BÁSICAS ------------------
    if (!post_id || !user_id || !vote_type) {
      throw new Error("Faltan datos obligatorios: post_id, user_id o vote_type");
    }

    if (!["positive", "negative"].includes(vote_type)) {
      throw new Error("El tipo de voto debe ser 'positive' o 'negative'");
    }

    // Verificar que el post exista
    const post = await Post.findByPk(post_id);
    if (!post) throw new Error("Post no encontrado");

    // ------------------ DETECTAR VOTO EXISTENTE ------------------
    const existingVote = await PostVote.findOne({ where: { post_id, user_id } });

    if (existingVote) {
      // Caso 1: el usuario repite el mismo voto → se elimina (unvote)
      if (existingVote.vote_type === vote_type) {
        await existingVote.destroy();
      } else {
        // Caso 2: el usuario cambia de voto → se actualiza
        existingVote.vote_type = vote_type;
        await existingVote.save();
      }

    } else {
      // Caso 3: el usuario nunca había votado → se crea el voto
      await PostVote.create({ post_id, user_id, vote_type });
    }

    // ------------------ VOLVER A CONSULTAR CON RELACIÓN "Votes" ------------------
    // Esto es clave: gracias a los virtuales, el conteo se calcula automáticamente
    const updatedPost = await Post.findByPk(post_id, {
      include: {
        model: PostVote,
        as: "Votes",
        attributes: ["vote_type"], // solo necesitamos el tipo de voto
      },
    });

    return updatedPost;

  } catch (error) {
    throw new Error(`Error en votePost: ${error.message}`);
  }
};
