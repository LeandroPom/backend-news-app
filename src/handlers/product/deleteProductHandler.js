// handlers/product/deleteProductHandler.js
const deleteProduct = require("../../controllers/product/deleteProduct");

module.exports = async (req, res) => {
  try {
    const result = await deleteProduct(req.params.id);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
