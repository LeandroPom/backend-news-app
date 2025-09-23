// controllers/user/getByNameUser.js
const { User } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (name) => {
  try {
    const users = await User.findAll({
      where: {
        user_name: {
          [Op.iLike]: `%${name}%` // sin importar mayúsculas/minúsculas
        }
      },
      attributes: { exclude: ["password"] } // no devolvemos datos sensibles
    });

    if (!users.length) {
      throw new Error("No se encontraron usuarios con ese nombre");
    }

    return users;
  } catch (error) {
    throw new Error(`Error en getByNameUser: ${error.message}`);
  }
};
