// controllers/mercadoPago/failurePayment.js
require("dotenv").config();


module.exports = async (req, res) => {
  try {
    console.log( 'redirect from: failure')
   return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);

  } catch (error) {
    console.error("❌ failurePayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);
  }
};
