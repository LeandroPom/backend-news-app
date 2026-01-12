//controllers/product/controllers.js
const { Product } = require("../models");

/* =========================
   CREATE
========================= */
const createProduct = async ({ product_name, product_price }) => {
    if (!product_name) {
        throw new Error("product_name is required");
    }

    const newProduct = await Product.create({
        product_name,
        product_price,
    });

    return newProduct;
};

/* =========================
   READ
========================= */
const getAllProducts = async () => {
    return await Product.findAll();
};

const getProductById = async (product_id) => {
    const product = await Product.findByPk(product_id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

/* =========================
   UPDATE
========================= */
const updateProduct = async (product_id, data) => {
    const product = await Product.findByPk(product_id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.update(data);
    return product;
};

/* =========================
   DELETE
========================= */
const deleteProduct = async (product_id) => {
    const product = await Product.findByPk(product_id);

    if (!product) {
        throw new Error("Product not found");
    }

    await product.destroy();
    return { message: "Product deleted successfully" };
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
