// controllers/mercadoPago/notificationPayment.js
const { persistFromWebhook } = require("./managerOutput");

module.exports = async (req, res) => {
  try {
    const data = req.body?.data || {};
    const payment_id = data.id;
    const external_reference = data.external_reference;
    const mp_payment_status = data.status;

    if (!external_reference || !mp_payment_status) {
      return res.status(200).json({ ignored: true });
    }

    // "userId|productName"
    const [user_id, product_name] = external_reference.split("|");

    let mp_status = "pending";
    if (mp_payment_status === "approved") mp_status = "success";
    if (mp_payment_status === "rejected") mp_status = "failure";
    if (mp_payment_status === "cancelled") mp_status = "failure";

    const payment_info = {
      aux: mp_status,
      date_created: data.date_created,
      date_approved: data.date_approved || null,
      date_last_updated: data.date_last_updated || null,
      installments: data.installments,
      payer: data.payer || null,
      payment_method_id: data.payment_method_id,
      payment_type_id: data.payment_type_id,
      product_name: product_name,
      status: mp_payment_status,
      status_detail: data.status_detail,
      source: "webhook",
      transaction_amount: data.transaction_amount,
      user_id: user_id
    };

    await persistFromWebhook(
      payment_id,
      payment_info
    );


    return res.status(200).json({ status: "ok" });

  } catch (error) {
    console.error("❌ notificationPayment:", error.message);
    return res.status(200).json({
      status: "error",
      message: error.message
    });
  }
};
