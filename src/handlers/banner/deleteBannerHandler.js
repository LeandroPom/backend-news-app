// handlers/banner/deleteBannerHandler.js
const deleteBanner = require("../../controllers/banner/deleteBanner");

module.exports = async (req, res) => {
  try {
    
    const { id } = req.params;
    const result = await deleteBanner(id);

    return res.status(200).json(result);

  } catch (error) {
    console.error("❌ Error en deleteBannerHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
