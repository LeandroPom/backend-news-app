// controllers/banner/deleteBanner.js
const { Banner } = require("../../db");

module.exports = async (banner_id) => {
  try {

    const banner = await Banner.findByPk(banner_id);
    if (!banner) throw new Error("Banner no encontrado");

    await banner.destroy();
    
    return { message: "Banner eliminado correctamente" };

  } catch (error) {
    throw new Error(`Error en deleteBanner: ${error.message}`);
  }
};
