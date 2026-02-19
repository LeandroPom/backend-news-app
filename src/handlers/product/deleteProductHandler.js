// handlers/product/deleteProductHandler.js
const deleteProduct = require("../../controllers/product/deleteProduct");

module.exports = async (req, res) => {
  try {
    const product = await deleteProduct(req.params.id);

    return res.status(200).json({
      status: "success",
      message: "Producto eliminado correctamente",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
