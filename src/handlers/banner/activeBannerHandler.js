// handlers/banner/activeBannerHandler.js
const toggleActiveBanner = require("../../controllers/banner/activeBanner");

module.exports = async (req, res) => {
    
  try {
    const { id } = req.params;
    const { state } = req.body; // opcional: si no se envía, se alterna

    const updatedBanner = await toggleActiveBanner(id, state);

    return res.status(200).json({
      message: `✅ Banner ${updatedBanner.active ? "activado" : "desactivado"} correctamente`,
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("❌ Error en activeBannerHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
