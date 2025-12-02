// controllers/premium/createPremium.js
const { Premium, User } = require("../../db");

module.exports = async ({ user_id }) => {
  if (!user_id) throw new Error("Falta el user_id");

  const user = await User.findByPk(user_id);
  if (!user) throw new Error("Usuario no encontrado");

  // Verificar si ya existe
  const existing = await Premium.findOne({ where: { user_id } });
  if (existing) throw new Error("El usuario ya tiene Premium");

  const newPremium = await Premium.create({
    user_id,
    pay_date: new Date(),
  });

  return newPremium;
};
