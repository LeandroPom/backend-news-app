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

  if (!data || Object.keys(data).length === 0) {
    throw new Error("No se enviaron datos para actualizar");
  }

  // 🔹 No permitir modificar product_id
  if (data.product_id) {
    delete data.product_id;
  }

  const updatedValues = {
    ...product.toJSON(),
    ...data,
  };

  // 🔹 Validar precio
  if (updatedValues.product_price <= 0) {
    throw new Error("product_price debe ser mayor a 0");
  }

  // 🔹 Validar nombre único si cambia
  if (data.product_name) {
    const existing = await Product.findOne({
      where: { product_name: data.product_name },
    });

    if (existing && existing.product_id !== product.product_id) {
      throw new Error("Ya existe un producto con ese nombre");
    }
  }

  // 🔹 Validación coherencia stock
  if (updatedValues.is_unlimited) {
    updatedValues.product_amount = null;
  } else {
    if (
      updatedValues.product_amount === null ||
      updatedValues.product_amount === undefined
    ) {
      throw new Error(
        "product_amount es obligatorio cuando is_unlimited es false"
      );
    }

    if (updatedValues.product_amount < 0) {
      throw new Error("product_amount debe ser mayor o igual a 0");
    }
  }

  // 🔹 Validar descuento
  if (updatedValues.discount_active) {
    if (
      updatedValues.discount_percent < 0 ||
      updatedValues.discount_percent > 100
    ) {
      throw new Error("discount_percent debe estar entre 0 y 100");
    }
  }

  await product.update(updatedValues);

  return product;
};
