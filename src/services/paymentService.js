// services/paymentService.js

const { MercadoPagoConfig, Preference } = require("mercadopago");
const { Payment, Purchase, PurchaseItem } = require("../db");

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

async function createPreference(purchase_id) {

  const purchase = await Purchase.findByPk(purchase_id, {
    include: PurchaseItem
  });
  console.log(purchase)

  if (!purchase || purchase.status !== "pending")
    throw new Error("Purchase inválida");

  const preference = new Preference(client);
   console.log(preference)

  const body = {
    items: purchase.PurchaseItems.map(i => ({
      title: `Producto ${i.product_id}`,
      quantity: i.quantity,
      unit_price: i.subtotal / i.quantity,
      currency_id: purchase.currency
    })),

    external_reference: purchase.purchase_id,

    notification_url: `${process.env.BACKEND_URL}/payments/notification`,

    back_urls: {
      success: `${process.env.FRONTEND_URL}/success`,
      failure: `${process.env.FRONTEND_URL}/failure`,
      pending: `${process.env.FRONTEND_URL}/pending`,
    },
  };
   console.log(body)

  const result = await preference.create({ body });
   console.log(result)

  await Payment.create({
    purchase_id,
    mp_preference_id: result.id
  });

  return result.init_point;
}


module.exports = { createPreference };