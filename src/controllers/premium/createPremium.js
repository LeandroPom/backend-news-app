// controllers/premium/createPremium.js
const { Premium, User } = require("../../db");

/**
 * 🎯 getPremium
 * - Crea Premium si el usuario no tiene
 * - Renueva Premium si ya existe
 * - amount = días a agregar
 *
 * Este controller:
 * - NO valida pagos
 * - NO consulta Mercado Pago
 * - Confía en activate.js / resolvePurchase
 */
module.exports = async (user_id, amount) => {
  try {
    // =========================
    // 1️⃣ Validaciones básicas
    // =========================
    if (!user_id || !Number.isInteger(amount) || amount <= 0) {
      throw new Error("Parámetros inválidos para activar Premium");
    }

    // =========================
    // 2️⃣ Buscar usuario
    // =========================
    const user = await User.findByPk(user_id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // =========================
    // 3️⃣ Buscar Premium existente
    // =========================
    const premium = await Premium.findOne({ where: { user_id } });

    const now = new Date();
    let newExpiration;

    // =========================
    // 4️⃣ Crear o renovar Premium
    // =========================
    if (!premium) {
      // 🆕 Premium nuevo
      newExpiration = new Date();
      newExpiration.setDate(newExpiration.getDate() + amount);

      const createdPremium = await Premium.create({
        user_id,
        expiration_date: newExpiration
      });

      // Reflejar estado en User
      user.premium = true;
      await user.save();

      return {
        action: "created",
        premium: createdPremium
      };
    }

    // 🔁 Renovación
    const currentExpiration = new Date(premium.expiration_date);

    if (currentExpiration < now) {
      // Premium vencido → desde hoy
      newExpiration = new Date();
    } else {
      // Premium activo → desde expiración actual
      newExpiration = new Date(currentExpiration);
    }

    newExpiration.setDate(newExpiration.getDate() + amount);

    premium.expiration_date = newExpiration;
    await premium.save();

    // Aseguramos flag en User
    if (!user.premium) {
      user.premium = true;
      await user.save();
    }

    return {
      action: "renewed",
      premium
    };

  } catch (error) {
    throw new Error(`getPremium: ${error.message}`);
  }
};
