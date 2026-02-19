// controllers/product/createProduct.js
const { Product } = require("../../db");

module.exports = async (data) => {
  const {
    product_name,
    product_price,
    product_amount,
    is_unlimited,
    discount_percent,
    discount_active,
    active,
    description,
    product_img,
  } = data;

  // 🔹 Validaciones obligatorias
  if (!product_name) {
    throw new Error("product_name es obligatorio");
  }

  if (!product_price || product_price <= 0) {
    throw new Error("product_price debe ser mayor a 0");
  }

  if (typeof is_unlimited !== "boolean") {
    throw new Error("is_unlimited es obligatorio");
  }

  if (typeof discount_active !== "boolean") {
    throw new Error("discount_active es obligatorio");
  }

  // 🔹 Validar nombre único
  const existing = await Product.findOne({ where: { product_name } });
  if (existing) {
    throw new Error("Ya existe un producto con ese nombre");
  }

  // 🔹 Manejo stock
  let finalAmount = product_amount;

  if (is_unlimited) {
    finalAmount = null;
  } else {
    if (finalAmount === undefined || finalAmount === null) {
      throw new Error("product_amount es obligatorio cuando no es ilimitado");
    }
    if (finalAmount < 0) {
      throw new Error("product_amount debe ser mayor o igual a 0");
    }
  }

  // 🔹 Validar descuento
  let finalDiscount = discount_percent ?? 0;

  if (discount_active) {
    if (finalDiscount < 0 || finalDiscount > 100) {
      throw new Error("discount_percent debe estar entre 0 y 100");
    }
  }

  const product = await Product.create({
    product_name,
    product_price,
    product_amount: finalAmount,
    is_unlimited,
    discount_percent: finalDiscount,
    discount_active,
    active: active ?? true,
    description,
    product_img,
  });

  return product;
};
