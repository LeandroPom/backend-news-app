// controllers/banner/activeBanner.js
const { Banner } = require("../../db");

module.exports = async (banner_id, state) => {
  try {
    
    const banner = await Banner.findByPk(banner_id);
    if (!banner) throw new Error("Banner no encontrado");

    // ✅ Cambiar el estado activo
    banner.active = typeof state === "boolean" ? state : !banner.active;
    await banner.save();

    return banner;

  } catch (error) {
    throw new Error(`Error en toggleActiveBanner: ${error.message}`);
  }
};
