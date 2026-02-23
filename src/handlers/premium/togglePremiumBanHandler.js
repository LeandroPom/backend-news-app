// handlers/premium/togglePremiumBanHandler.js

const { togglePremiumBan } = require("../../controllers/premium/adminToolsPremium");

module.exports = async (req, res) => {
  try {
    const { admin_user_id, target_user_id } = req.body;

    const result = await togglePremiumBan({
      admin_user_id,
      target_user_id
    });

    return res.status(200).json({
      status: "success",
      message: "Estado de ban modificado correctamente",
      data: result
    });

  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};