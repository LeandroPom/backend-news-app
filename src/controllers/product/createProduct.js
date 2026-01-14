// controllers/product/createProduct.js
const { Product } = require("../../models");

module.exports = async ({ product_name, product_price }) => {
  // Validaciones
  if (!product_name || typeof product_name !== "string") {
    throw new Error("product_name es obligatorio y debe ser un string");
  }

  if (product_price === undefined || isNaN(product_price) || product_price < 0) {
    throw new Error("product_price debe ser un número válido mayor o igual a 0");
  }

  // Crear producto
  const product = await Product.create({
    product_name,
    product_price,
  });

  return product;
};
