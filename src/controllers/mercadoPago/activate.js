// controllers/mercadoPago/activate.js
const { resolvePurchase } = require("./managerOutput");

// Controllers secundarios
const getPremium = require("../premium/getPremium"); 
// const getGold = require("../gold/getGold"); ← futuro

module.exports = async (req, res) => {
  try {
    /**
     * 🔐 user_id puede venir:
     * - desde req.body (frontend explícito)
     * - o desde JWT (recomendado)
     */
    const user_id = req.user?.id || req.body?.user_id;

    if (!user_id) {
      return res.status(400).json({
        status: "error",
        message: "user_id requerido"
      });
    }

    // 1️⃣ Resolver compra
    const result = await resolvePurchase(user_id);

    /**
     * result = {
     *   status: "success" | "pending" | "failure",
     *   purchase
     * }
     */

    // 2️⃣ Cortar flujo si no es success
    if (result.status !== "success") {
      return res.status(409).json({
        status: "error",
        message: `No es posible activar la compra (estado: ${result.status})`,
        result
      });
    }

    const { purchase } = result;
    const { product_name, amount } = purchase;

    if (!product_name || !amount) {
      return res.status(500).json({
        status: "error",
        message: "purchase incompleto (product_name / amount)",
        result
      });
    }

    // 3️⃣ Activación por tipo de producto
    let activationResult;

    switch (product_name) {
      case "Premium":
        activationResult = await getPremium(user_id, amount);
        break;

      // case "Gold":
      //   activationResult = await getGold(user_id, amount);
      //   break;

      default:
        return res.status(400).json({
          status: "error",
          message: `Producto no soportado: ${product_name}`,
          result
        });
    }

    // 4️⃣ Respuesta exitosa
    return res.status(200).json({
      status: "success",
      purchase,
      activation: activationResult
    });

  } catch (error) {
    console.error("❌ activate:", error.message);

    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};
