// controllers/premium/getAllPremiumUsers.js
const { Premium, User } = require("../../db");

module.exports = async () => {
  const premiums = await Premium.findAll({
    include: [{ model: User, as: "User" }],
    order: [["pay_date", "DESC"]],
  });

  return premiums;
};
