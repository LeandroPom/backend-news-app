const { Rating } = require('../../db');

module.exports = async (userId, postId, vote) => {
  const { valueUp, valueDown } = vote;

  if (valueUp && valueDown) {
    throw new Error("No se puede votar positivo y negativo al mismo tiempo.");
  }

  let rating = await Rating.findOne({
    where: { userId, postId }
  });

  if (!rating) {
    // No había voto previo → crear uno nuevo
    rating = await Rating.create({
      userId,
      postId,
      valueUp: !!valueUp,
      valueDown: !!valueDown
    });
  } else {
    // Voto previo existente → actualizarlo
    await rating.update({
      valueUp: !!valueUp,
      valueDown: !!valueDown
    });
  }

  return {
    message: "Voto registrado",
    rating: {
      valueUp: rating.valueUp,
      valueDown: rating.valueDown
    }
  };
};
