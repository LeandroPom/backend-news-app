// handlers/banner/createBannerHandler.js
const createBanner = require("../../controllers/banner/createBanner");

module.exports = async (req, res) => {
  try {

    const newBanner = await createBanner(req.body);
    
    return res.status(201).json({ message: "✅ Banner creado con éxito", banner: newBanner });

  } catch (error) {
    console.error("❌ Error en createBannerHandler:", error);
    return res.status(400).json({ error: error.message });

  }
};
