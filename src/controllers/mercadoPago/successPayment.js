// controllers/mercadoPago/successPayment.js
require("dotenv").config();


module.exports = async (req, res) => {
  try {

    console.log( 'redirect from: success')
    return res.redirect(302, `${process.env.FRONTEND_URL}/success`);

  } catch (error) {
    console.error("❌ successPayment:", error);
    return res.redirect(302, `${process.env.FRONTEND_URL}/failure`);
  }
};
