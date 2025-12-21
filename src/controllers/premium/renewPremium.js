// controllers/premium/renewPremium.js
const { Premium, User } = require("../../db");

module.exports = async ({ user_id, days }) => {
  if (!user_id || !days) {
    throw new Error("Faltan datos obligatorios: user_id o days");
  }

  // 1️⃣ Buscar usuario
  const user = await User.findByPk(user_id);
  if (!user) throw new Error("El usuario no existe");

  // 2️⃣ Buscar premium asociado
  const premium = await Premium.findOne({ where: { user_id } });
  if (!premium) throw new Error("El usuario no posee Premium");

  const now = new Date();
  const expiration = new Date(premium.expiration_date);

  let newExpiration;

  // 3️⃣ Comparación de fechas
  if (expiration < now) {
    // Premium vencido → desde hoy
    newExpiration = new Date();
    newExpiration.setDate(newExpiration.getDate() + Number(days));
  } else {
    // Premium activo → extender desde expiración actual
    newExpiration = new Date(expiration);
    newExpiration.setDate(newExpiration.getDate() + Number(days));
  }

  // 4️⃣ Actualizar
  premium.expiration_date = newExpiration;
  await premium.save();

  return premium;
};
