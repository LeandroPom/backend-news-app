// controllers/banner/editBanner.js
const { Banner } = require("../../db");

module.exports = async (banner_id, updates) => {
  try {
    const banner = await Banner.findByPk(banner_id);
    if (!banner) throw new Error("Banner no encontrado");

    // ✅ Campos permitidos para actualización
    const allowedFields = ["banner_name", "img", "timer", "timer_start", "timer_end", "priority"];
    const fieldsToUpdate = {};

    for (const field of allowedFields) {
      if (updates[field] !== undefined) fieldsToUpdate[field] = updates[field];
    }

    // ✅ Actualizamos y guardamos
    await banner.update(fieldsToUpdate);

    return banner;

  } catch (error) {
    throw new Error(`Error en editBanner: ${error.message}`);
  }
};
