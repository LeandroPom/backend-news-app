// handlers/product/getProductByIdHandler.js
const getProductById = require("../../controllers/product/getProductById");

module.exports = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);

    return res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};
