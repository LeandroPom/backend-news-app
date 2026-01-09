// controllers/mercadoPago/pendingPayment.js
require("dotenv").config();
// const managerOutput = require("./managerOutput");

module.exports = async (req, res) => {
  try {
    // const {
    //   external_reference,
    //   payment_id,
    //   status,
    //   status_detail,
    //   collection_id,
    //   collection_status,
    //   payment_method_id
    // } = req.query;

    // await managerOutput(
    //   external_reference,
    //   payment_id || null,
    //   {
    //     status,
    //     status_detail,
    //     collection_id,
    //     collection_status,
    //     payment_method_id,
    //     retry_available: true
    //   },
    //   "pending"
    // );

    return res.redirect(302, `${process.env.FRONTEND_URL}/pending`);

  } catch (error) {
    console.error("❌ pendingPayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/pending`);
  }
};
