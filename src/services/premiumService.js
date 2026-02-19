// services/premiumService.js
const { Premium } = require("../db");

/**
 * 🔹 Normaliza fecha a 23:59:59.999
 */
function endOfDay(date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * 🔐 Aplica Premium (idempotente por purchase_id)
 */
async function applyPremium({ user_id, days, purchase_id, transaction }) {

  if (!days || days <= 0) return;

  const now = new Date();

  let premium = await Premium.findOne({
    where: { user_id },
    transaction,
    lock: transaction.LOCK.UPDATE
  });

  // 🛑 Idempotencia real
  if (premium?.applied_purchase_id === purchase_id) return;

  if (!premium) {

    const expiration = endOfDay(now);
    expiration.setDate(expiration.getDate() + days);

    await Premium.create({
      user_id,
      expiration_date: expiration,
      applied_purchase_id: purchase_id
    }, { transaction });

    return;
  }

  if (premium.expiration_date < now) {

    const expiration = endOfDay(now);
    expiration.setDate(expiration.getDate() + days);
    premium.expiration_date = expiration;

  } else {

    const expiration = new Date(premium.expiration_date);
    expiration.setDate(expiration.getDate() + days);
    premium.expiration_date = endOfDay(expiration);
  }

  premium.applied_purchase_id = purchase_id;
  await premium.save({ transaction });
}

/**
 * 🔻 Revierte Premium si el payment fue revertido
 */
async function revokePremium({ user_id, purchase_id, transaction }) {

  const premium = await Premium.findOne({
    where: { user_id },
    transaction,
    lock: transaction.LOCK.UPDATE
  });

  if (!premium) return;

  if (premium.applied_purchase_id !== purchase_id) return;

  await premium.destroy({ transaction });
}

module.exports = {
  applyPremium,
  revokePremium
};
