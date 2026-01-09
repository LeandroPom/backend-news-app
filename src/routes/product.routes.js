//routes/product.routes.js
const { Router } = require("express");
const {
    createProductHandler,
    getAllProductsHandler,
    getProductByIdHandler,
    updateProductHandler,
    deleteProductHandler,
} = require("../handlers/product/handlers");

const productRouter = Router();

/* =========================
   CRUD Routes
========================= */
productRouter.post("/", createProductHandler);       // CREATE
productRouter.get("/", getAllProductsHandler);        // READ ALL
productRouter.get("/:id", getProductByIdHandler);     // READ ONE
productRouter.put("/:id", updateProductHandler);      // UPDATE
productRouter.delete("/:id", deleteProductHandler);   // DELETE

module.exports = productRouter;
