//routes/order.js
const { Router } = require("express");
const createPurchase = require("../controllers/orders/createPurchase");
const getPurchase = require("../controllers/orders/getPurchase");

const orderRouter = Router();

orderRouter.post("/", createPurchase);
orderRouter.get("/:id", getPurchase);

module.exports = orderRouter;
