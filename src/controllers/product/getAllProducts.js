// controllers/product/getAllProducts.js
const { Product } = require("../../models");

module.exports = async () => {
  return await Product.findAll();
};
