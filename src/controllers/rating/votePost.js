const { Rating } = require('../../db');

module.exports = async (userId, postId, { valueUp, valueDown }) => {
  
  if (valueUp && valueDown) {
    throw new Error("No se puede votar positivo y negativo al mismo tiempo.");
  }

  const [rating, created] = await Rating.findOrCreate({
    where: { userId, postId },
    defaults: { valueUp: !!valueUp, valueDown: !!valueDown }
  });

  if (!created) {
    await rating.update({
      valueUp: !!valueUp,
      valueDown: !!valueDown
    });
  }

  return {
    message: 'Voto registrado',
    rating: {
      valueUp: rating.valueUp,
      valueDown: rating.valueDown
    }
  };
};
