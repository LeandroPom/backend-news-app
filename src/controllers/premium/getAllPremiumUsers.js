// controllers/premium/getAllPremiumUsers.js
const { Premium, User } = require("../../db");

module.exports = async () => {
  const premiums = await Premium.findAll({
    include: [
      {
        model: User,
        as: "User",
        attributes: {
          exclude: ["password", "mail", "createdAt", "updatedAt"],
        },
      },
    ],
    order: [["expiration_date", "DESC"]],
  });

  return premiums;
};
