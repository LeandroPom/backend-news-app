//handlers/product/handlers.js
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../../controllers/product/controllers");

/* =========================
   CREATE
========================= */
const createProductHandler = async (req, res) => {
    try {
        const product = await createProduct(req.body);
        res.status(201).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

/* =========================
   READ
========================= */
const getAllProductsHandler = async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json({
            status: "success",
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const getProductByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await getProductById(id);

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: error.message,
        });
    }
};

/* =========================
   UPDATE
========================= */
const updateProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await updateProduct(id, req.body);

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message,
        });
    }
};

/* =========================
   DELETE
========================= */
const deleteProductHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await deleteProduct(id);

        res.status(200).json({
            status: "success",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            status: "error",
            message: error.message,
        });
    }
};

module.exports = {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
};
