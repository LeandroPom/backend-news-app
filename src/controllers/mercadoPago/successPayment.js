// controllers/mercadoPago/successPayment.js
require("dotenv").config();
// const managerOutput = require("./managerOutput");

module.exports = async (req, res) => {
  try {
    // const { external_reference, payment_id, status, payment_type } = req.query;

    // await managerOutput(
    //   external_reference,
    //   payment_id,
    //   {
    //     status,
    //     payment_type
    //   },
    //   "success"
    // );

    return res.redirect(302, `${process.env.FRONTEND_URL}/success`);

  } catch (error) {
    console.error("❌ successPayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);
  }
};
