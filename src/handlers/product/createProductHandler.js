// handlers/product/createProductHandler.js
const createProduct = require("../../controllers/product/createProduct");

module.exports = async (req, res) => {
  try {
    const product = await createProduct(req.body);

    return res.status(201).json({
      status: "success",
      message: "Producto creado correctamente",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
