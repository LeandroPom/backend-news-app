//controllers/orders/getPurchase.js
const { Purchase, PurchaseItem, Product } = require("../../db");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const purchase = await Purchase.findByPk(id, {
      include: {
        model: PurchaseItem,
        include: Product
      }
    });

    if (!purchase)
      return res.status(404).json({ error: "Purchase not found" });

    return res.json(purchase);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
