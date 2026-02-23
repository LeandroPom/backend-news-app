// controllers/banner/checkBannerExpiration.js

const { Banner, conn } = require("../../db");
const { Op } = require("sequelize");

module.exports = async () => {
  return await conn.transaction(async (transaction) => {

    const now = new Date();

    // 🔎 Buscar banners con timer vencido
    const expiredBanners = await Banner.findAll({
      where: {
        timer: true,
        timer_end: {
          [Op.lt]: now
        },
        active: true
      },
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    // 🔻 Desactivar automáticamente
    for (const banner of expiredBanners) {
      banner.active = false;
      await banner.save({ transaction });
    }

    // 🔄 Obtener todos los banners actualizados
    const allBanners = await Banner.findAll({
      order: [["priority", "DESC"], ["createdAt", "DESC"]],
      transaction
    });

    const activeBanners = [];
    const inactiveBanners = [];

    for (const banner of allBanners) {
      if (banner.active) {
        activeBanners.push(banner);
      } else {
        inactiveBanners.push(banner);
      }
    }

    return {
      activeBanners,
      inactiveBanners
    };
  });
};