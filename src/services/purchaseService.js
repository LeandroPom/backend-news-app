// services/purchaseService.js

const { Purchase, PurchaseItem, Product, conn } = require("../db");
const { Op } = require("sequelize");

async function createOrUpdatePurchase(user_id, items) {
  return await conn.transaction(async (t) => {

    // 1️⃣ Buscar purchase pendiente
    let purchase = await Purchase.findOne({
      where: {
        user_id,
        status: "pending",
        expires_at: { [Op.gt]: new Date() }
      },
      lock: true,
      transaction: t
    });

    if (!purchase) {
      purchase = await Purchase.create({
        user_id,
        expires_at: new Date(Date.now() + 30 * 60 * 1000)
      }, { transaction: t });
    }

    // 2️⃣ Procesar cada producto
    for (const item of items) {

      const product = await Product.findByPk(item.product_id, {
        lock: true,
        transaction: t
      });

      if (!product || !product.active)
        throw new Error("Producto inválido");

      if (!product.is_unlimited) {
        if (product.product_amount < item.quantity)
          throw new Error("Stock insuficiente");

        // 🔒 Bloqueo real
        product.product_amount -= item.quantity;
        await product.save({ transaction: t });
      }

      const discount = product.discount_active
        ? product.discount_percent
        : 0;

      const priceWithDiscount =
        product.product_price * (1 - discount / 100);

      const subtotal = priceWithDiscount * item.quantity;

      await PurchaseItem.create({
        purchase_id: purchase.purchase_id,
        product_id: product.product_id,
        quantity: item.quantity,
        unit_price_snapshot: product.product_price,
        discount_percent_snapshot: discount,
        subtotal
      }, { transaction: t });
    }

    // 3️⃣ Recalcular total
    const total = await PurchaseItem.sum("subtotal", {
      where: { purchase_id: purchase.purchase_id },
      transaction: t
    });

    purchase.total_amount = total;
    await purchase.save({ transaction: t });

    return purchase;
  });
}


module.exports = { createOrUpdatePurchase };
