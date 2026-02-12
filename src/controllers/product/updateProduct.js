// controllers/product/updateProduct.js
const { Product } = require("../../db");

module.exports = async (product_id, data) => {
  if (!product_id || isNaN(product_id)) {
    throw new Error("product_id inválido");
  }

  const product = await Product.findByPk(product_id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  // No permitir updates vacíos
  if (!data || Object.keys(data).length === 0) {
    throw new Error("No se enviaron datos para actualizar");
  }

  await product.update(data);
  return product;
};
