// controllers/product/deleteProduct.controller.js
const { Product } = require("../../models");

module.exports = async (product_id) => {
  if (!product_id || isNaN(product_id)) {
    throw new Error("product_id inválido");
  }

  const product = await Product.findByPk(product_id);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  await product.destroy();

  return {
    message: "Producto eliminado correctamente",
    product_id,
  };
};
