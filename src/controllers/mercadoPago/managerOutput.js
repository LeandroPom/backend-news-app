// controllers/mercadoPago/managerOutput.js
const { User } = require("../../db");

/**
 * ================================
 * 1️⃣ Persistencia automática (WEBHOOK)
 * ================================
 */
const persistFromWebhook = async (
  payment_id,
  payment_info
) => {
  const { user_id, product_name } = payment_info;

  if (!user_id || !product_name) {
    throw new Error("payment_info incompleto (user_id / product_name)");
  }

  const user = await User.findByPk(Number(user_id));
  if (!user) throw new Error("Usuario no encontrado");

  if (!user.pending_purchase || user.pending_purchase.length !== 1) {
    throw new Error("No existe una compra pendiente para actualizar");
  }

  const purchase = user.pending_purchase[0];

  // Validación fuerte de coherencia
  if (purchase.product_name !== product_name) {
    throw new Error("product_name no coincide con pending_purchase");
  }

  // Idempotencia: si el payment_info es idéntico, ignorar
  if (
    purchase.payment_info &&
    JSON.stringify(purchase.payment_info) === JSON.stringify({
      payment_id,
      ...payment_info
    })
  ) {
    return { ignored: true };
  }

  // Sobrescribir completamente payment_info
  purchase.payment_info = {
    payment_id,
    ...payment_info
  };

  purchase.lastUpdatedAt = new Date();

  await user.update({
    pending_purchase: [purchase]
  });

  return { persisted: true };
};

/**
 * ================================
 * 2️⃣ Resolución final (FRONTEND / OTROS FLUJOS)
 * ================================
 */
const resolvePurchase = async (user_id) => {
  const user = await User.findByPk(user_id);
  if (!user) throw new Error("Usuario no encontrado");

  if (!user.pending_purchase || user.pending_purchase.length !== 1) {
    throw new Error("No existe una compra pendiente para resolver");
  }

  const purchase = user.pending_purchase[0];

  if (!purchase.payment_info || !purchase.payment_info.aux) {
    throw new Error("La compra aún no tiene información suficiente para resolverse");
  }

  const finalStatus = purchase.payment_info.aux;

  purchase.mp_status = finalStatus;
  purchase.resolvedAt = new Date();
  purchase.lastUpdatedAt = new Date();

  // Vaciar pending_purchase
  await user.update({ pending_purchase: [] });

  if (finalStatus === "success") {
    await user.update({
      success_purchase: [...user.success_purchase, purchase]
    });

    return { status: "success", purchase };
  }

  if (finalStatus === "pending") {
    await user.update({
      pending_purchase: [purchase]
    });

    return { status: "pending", purchase };
  }

  if (finalStatus === "failure") {
    await user.update({
      failure_purchase: [...user.failure_purchase, purchase]
    });

    return { status: "failure", purchase };
  }

  throw new Error("Estado final desconocido");
};

module.exports = {
  persistFromWebhook,
  resolvePurchase
};
