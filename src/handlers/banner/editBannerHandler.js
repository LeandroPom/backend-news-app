// handlers/banner/editBannerHandler.js
const editBanner = require("../../controllers/banner/editBanner");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBanner = await editBanner(id, req.body);

    return res.status(200).json({
      message: "✅ Banner actualizado correctamente",
      banner: updatedBanner,
    });
    
  } catch (error) {
    console.error("❌ Error en editBannerHandler:", error);
    return res.status(400).json({ error: error.message });
  }
};
