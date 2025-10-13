// controllers/banner/createBanner.js
const { Banner } = require("../../db");

module.exports = async ({ banner_name, img, timer, timer_start, timer_end, priority }) => {
  try {
    // ✅ Validación básica
    if (!banner_name || !img || !Array.isArray(img) || img.length === 0) {
      throw new Error("El nombre y al menos una imagen son obligatorios");
    }

    // ✅ Evitar duplicados
    const existing = await Banner.findOne({ where: { banner_name } });
    if (existing) throw new Error("Ya existe un banner con ese nombre");

    // ✅ Crear banner
    const newBanner = await Banner.create({
      banner_name,
      img,
      timer: timer || false,
      timer_start: timer_start || null,
      timer_end: timer_end || null,
      priority: priority || false,
    });

    return newBanner;
    
  } catch (error) {
    throw new Error(`Error en createBanner: ${error.message}`);
  }
};
