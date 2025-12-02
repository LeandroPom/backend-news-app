// controllers/premium/renewPremium.js
const { Premium } = require("../../db");

module.exports = async ({ user_id, premium_id }) => {
  if (!user_id && !premium_id)
    throw new Error("Debe proporcionar user_id o premium_id");

  const where = {};
  if (user_id) where.user_id = user_id;
  if (premium_id) where.premium_id = premium_id;

  const premium = await Premium.findOne({ where });

  if (!premium) throw new Error("Premium no encontrado");

  premium.pay_date = new Date();
  await premium.save();

  return premium;
};
