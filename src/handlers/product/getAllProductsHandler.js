// handlers/product/getAllProductsHandler.js
const getAllProducts = require("../../controllers/product/getAllProducts");

module.exports = async (_req, res) => {
  try {
    const products = await getAllProducts();

    return res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error obteniendo productos",
    });
  }
};
