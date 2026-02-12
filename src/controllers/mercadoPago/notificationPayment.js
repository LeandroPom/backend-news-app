// controllers/mercadoPago/notificationPayment.js

const { MercadoPagoConfig, Payment: MP_Payment } = require("mercadopago");
const { Purchase, Payment, Product, conn } = require("../../db");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

module.exports = async (req, res) => {
  try {

    const paymentId = req.body?.data?.id;

    if (!paymentId)
      return res.status(200).json({ ignored: true });

    // 🔐 VALIDACIÓN REAL
    const mpPayment = await new MP_Payment(client).get({ id: paymentId });

    const purchase_id = mpPayment.external_reference;

    const purchase = await Purchase.findByPk(purchase_id);

    if (!purchase)
      return res.status(200).json({ ignored: true });

    // 🔐 Validar monto
    if (Number(mpPayment.transaction_amount) !== Number(purchase.total_amount))
      throw new Error("Monto inconsistente");

    await conn.transaction(async (t) => {

      await Payment.create({
        purchase_id,
        mp_payment_id: mpPayment.id,
        mp_status: mpPayment.status,
        transaction_amount: mpPayment.transaction_amount,
        raw_response: mpPayment
      }, { transaction: t });

      if (mpPayment.status === "approved") {

        purchase.status = "success";
        await purchase.save({ transaction: t });

      } else if (["rejected", "cancelled"].includes(mpPayment.status)) {

        purchase.status = "failure";
        await purchase.save({ transaction: t });

        // 🔁 devolver stock
        const items = await purchase.getPurchaseItems({ transaction: t });

        for (const item of items) {
          const product = await Product.findByPk(item.product_id, { transaction: t });

          if (!product.is_unlimited) {
            product.product_amount += item.quantity;
            await product.save({ transaction: t });
          }
        }
      }
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(200).json({ error: true });
  }
  
};
