//controllers/orders/createPurchase.js
const { createOrUpdatePurchase } = require("../../services/purchaseService");

module.exports = async (req, res) => {
  try {
    const { user_id, items } = req.body;

    const purchase = await createOrUpdatePurchase(user_id, items);

    return res.status(200).json({
      purchase_id: purchase.purchase_id,
      total_amount: purchase.total_amount,
      expires_at: purchase.expires_at
    });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
