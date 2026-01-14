// handlers/product/updateProductHandler.js
const updateProduct = require("../../controllers/product/updateProduct");

module.exports = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.body);

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
