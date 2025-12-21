// controllers/premium/createPremium.js
const { Premium, User } = require("../../db");
const dateUtils = require("../utils/dateUtils");

module.exports = async ({ user_id, days }) => {
  if (!user_id || !days) {
    throw new Error("Faltan datos obligatorios: user_id o days");
  }

  const user = await User.findByPk(user_id);
  if (!user) throw new Error("Usuario no encontrado");

  const existing = await Premium.findOne({ where: { user_id } });
  if (existing) throw new Error("El usuario ya tiene Premium");

  const expiration_date = dateUtils(days);

  const premium = await Premium.create({
    user_id,
    expiration_date,
  });

  //reflejar en User
  user.premium = true;
  await user.save();

  return premium;
};
