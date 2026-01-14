// routes/product.routes.js
const { Router } = require("express");

// Handlers (uno por archivo)
const createProductHandler = require("../handlers/product/createProductHandler");
const getAllProductsHandler = require("../handlers/product/getAllProductsHandler");
const getProductByIdHandler = require("../handlers/product/getProductByIdHandler");
const updateProductHandler = require("../handlers/product/updateProductHandler");
const deleteProductHandler = require("../handlers/product/deleteProductHandler");

const productRouter = Router();

/* =========================
   CRUD Routes
========================= */

// CREATE
productRouter.post("/", createProductHandler);

// READ ALL
productRouter.get("/", getAllProductsHandler);

// READ ONE
productRouter.get("/:id", getProductByIdHandler);

// UPDATE
productRouter.put("/:id", updateProductHandler);

// DELETE
productRouter.delete("/:id", deleteProductHandler);

module.exports = productRouter;
