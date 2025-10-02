// handlers/banner/getAllBannersHandler.js
const getAllBanners = require("../../controllers/banner/getAllBanners");

module.exports = async (req, res) => {
  try {
    
    const banners = await getAllBanners();

    return res.status(200).json(banners);

  } catch (error) {

    console.error("❌ Error en getAllBannersHandler:", error);
    return res.status(500).json({ error: error.message });
  }
};
