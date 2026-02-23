// controllers/premium/adminToolsPremium.js

const { Premium, User, conn } = require("../../db");

/**
 * 🔹 Normaliza fecha al final del día
 */
function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 🔐 Valida que el usuario sea administrador
 */
async function validateAdmin(admin_user_id, transaction) {
  const admin = await User.findByPk(admin_user_id, { transaction });

  if (!admin || admin.admin !== true) {
    throw new Error("No tiene permisos suficientes");
  }

  return admin;
}

/**
 * 👑 ADMIN TOOL
 * Otorga Premium manualmente
 */
async function grantPremiumManual({
  admin_user_id,
  target_user_id,
  amount
}) {

  if (!amount || amount <= 0) {
    throw new Error("Debe especificar una cantidad válida de días");
  }

  return await conn.transaction(async (transaction) => {

    await validateAdmin(admin_user_id, transaction);

    const user = await User.findByPk(target_user_id, { transaction });

    if (!user) {
      throw new Error("Usuario objetivo no encontrado");
    }

    let premium = await Premium.findOne({
      where: { user_id: target_user_id },
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    const now = new Date();

    if (!premium) {
      // 🆕 Crear nuevo premium
      const expiration = endOfDay(now);
      expiration.setDate(expiration.getDate() + amount);

      premium = await Premium.create({
        user_id: target_user_id,
        expiration_date: expiration,
        is_banned: false,
        applied_purchase_id: null
      }, { transaction });

    } else {

      // Si está vencido → reinicia desde hoy
      if (premium.expiration_date < now) {

        const newExpiration = endOfDay(now);
        newExpiration.setDate(newExpiration.getDate() + amount);
        premium.expiration_date = newExpiration;

      } else {
        // Si está activo → acumula días
        const newExpiration = new Date(premium.expiration_date);
        newExpiration.setDate(newExpiration.getDate() + amount);
        premium.expiration_date = endOfDay(newExpiration);
      }

      await premium.save({ transaction });
    }

    // 🔄 Sincronizar flag en User
    user.premium = true;
    await user.save({ transaction });

    return premium;
  });
}

/**
 * 🚫 ADMIN TOOL
 * Alterna estado de ban del premium
 */
async function togglePremiumBan({
  admin_user_id,
  target_user_id
}) {

  return await conn.transaction(async (transaction) => {

    await validateAdmin(admin_user_id, transaction);

    const premium = await Premium.findOne({
      where: { user_id: target_user_id },
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    if (!premium) {
      throw new Error("El usuario no posee Premium");
    }

    premium.is_banned = !premium.is_banned;
    await premium.save({ transaction });

    return premium;
  });
}

module.exports = {
  grantPremiumManual,
  togglePremiumBan
};