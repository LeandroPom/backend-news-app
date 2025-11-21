// controllers/rating/getUserFavorites.js
const { User, Post, PostVote } = require("../../db");

module.exports = async (user_id) => {
  if (!user_id) throw new Error("Falta el user_id");

  const user = await User.findByPk(user_id, {
    include: [
      {
        model: Post,
        as: "FavoritePosts",
        through: { attributes: [] }, // Oculta la tabla Favorite

        // ❗ No se especifican atributos → Sequelize incluye TODOS los campos del Post
        attributes: { exclude: [] },

        // Incluimos los votos para que los campos virtuales funcionen
        include: [
          {
            model: PostVote,
            as: "Votes",
            attributes: ["vote_type"], // solo necesitamos el tipo de voto
          },
        ],
      },
    ],
  });

  if (!user) throw new Error("Usuario no encontrado");

  return user.FavoritePosts;
};
