// handlers/premium/grantPremiumManualHandler.js

const { grantPremiumManual } = require("../../controllers/premium/adminToolsPremium");

module.exports = async (req, res) => {
  try {
    const { admin_user_id, target_user_id, amount } = req.body;

    const result = await grantPremiumManual({
      admin_user_id,
      target_user_id,
      amount
    });

    return res.status(200).json({
      status: "success",
      message: "Premium otorgado correctamente",
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};