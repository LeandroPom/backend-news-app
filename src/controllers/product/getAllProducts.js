// controllers/product/getAllProducts.js
const { Product } = require("../../db");

module.exports = async () => {
  return await Product.findAll();
};
