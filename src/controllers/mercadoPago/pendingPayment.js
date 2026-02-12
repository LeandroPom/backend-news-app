// controllers/mercadoPago/pendingPayment.js
require("dotenv").config();


module.exports = async (req, res) => {
  try {
    console.log( 'redirect from: pending')
    return res.redirect(302, `${process.env.FRONTEND_URL}/pending`);

  } catch (error) {
    console.error("❌ pendingPayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/pending`);
  }
};
