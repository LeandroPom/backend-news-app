//controllers/mercadoPago/createPreference.js
const { createPreference } = require("../../services/paymentService");

module.exports = async (req, res) => {
  try {
    const { purchase_id } = req.body;

    const init_point = await createPreference(purchase_id);

    return res.json({ init_point });

  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
