// controllers/post/getByNamePost.js
const { Post } = require("../../db");
const { Op } = require("sequelize");

module.exports = async (name) => {
  try {
    const posts = await Post.findAll({
      where: {
        headLine: {
          [Op.iLike]: `%${name}%` // busca sin importar mayúsculas/minúsculas
        }
      }
    });

    if (!posts.length) {
      throw new Error("No se encontraron posts con ese nombre");
    }

    return posts;
  } catch (error) {
    throw new Error(`Error en getByNamePost: ${error.message}`);
  }
};
