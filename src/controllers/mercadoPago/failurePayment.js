// controllers/mercadoPago/failurePayment.js
require("dotenv").config();
// const managerOutput = require("./managerOutput");

module.exports = async (req, res) => {
  try {
    // const { external_reference, payment_id, status, status_detail } = req.query;

    // await managerOutput(
    //   external_reference,
    //   payment_id || null,
    //   {
    //     status,
    //     status_detail
    //   },
    //   "failure"
    // );

    return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);

  } catch (error) {
    console.error("❌ failurePayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);
  }
};
