// controllers/banner/getAllBanners.js

const checkBannerExpiration = require("./checkBannerExpiration");

module.exports = async () => {
  try {

    const { activeBanners } = await checkBannerExpiration();

    // 🔥 Separar activos por prioridad
    const priorityBanners = activeBanners.filter(b => b.priority === true);
    const Banners = activeBanners.filter(b => b.priority === false);

    return {
      priority: priorityBanners,
      normal: Banners
    };

  } catch (error) {
    throw new Error(`Error en getAllBanners: ${error.message}`);
  }
};