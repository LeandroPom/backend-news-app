// controllers/banner/getAllBanners.js
const { Banner } = require("../../db");

module.exports = async () => {
  try {
    const banners = await Banner.findAll({
      order: [["priority", "DESC"], ["createdAt", "DESC"]],
    });

    return banners;
    
  } catch (error) {

    throw new Error(`Error en getAllBanners: ${error.message}`);
  }
};
