// controllers/mercadoPago/managerInput.js
const { User, Product } = require("../../db");
const createPreference = require("../mercadoPago/payment");

module.exports = async (user_id, product_id, amount) => {
  try {
    // 1️⃣ Validaciones básicas
    if (!user_id || !product_id || !Number.isInteger(amount) || amount <= 0) {
      throw new Error("Parámetros inválidos para iniciar la compra");
    }

    // 2️⃣ Buscar usuario
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // 3️⃣ Buscar producto
    const product = await Product.findByPk(product_id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    // 4️⃣ Crear objeto purchase
    const purchase = {
      user_name: user.user_name,
      mail: user.mail,
      product_name: product.product_name,
      product_price: product.product_price,
      amount,
      createdAt: new Date(),
      mp_status: "pending"
    };

    // 5️⃣ Guardar purchase en pending_purchase del usuario
    const updatedPendingPurchases = [
      ...user.pending_purchase,
      purchase
    ];

    await user.update({
      pending_purchase: updatedPendingPurchases
    });

    // 6️⃣ Crear preferencia de Mercado Pago
    const mp = await createPreference({
      user_id: user.user_id,
      user_name: user.user_name,
      mail: user.mail,
      product_name: product.product_name,
      product_price: product.product_price,
      amount
    });

    // 7️⃣ Respuesta final
    return {
      stage: "payment_created",
      init_point: mp.init_point
    };

  } catch (error) {
    throw new Error(`managerInput: ${error.message}`);
  }
};
