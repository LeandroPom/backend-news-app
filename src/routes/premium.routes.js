// routes/premiumRoutes.js
const { Router } = require("express");

const createPremium = require("../handlers/premium/createPremiumHandler");
const renewPremium = require("../handlers/premium/renewPremiumHandler");
const getPremium = require("../handlers/premium/getPremiumHandler");
const getAllPremiumUsers = require("../handlers/premium/getAllPremiumUsersHandler");


const premiumRouter = Router();


premiumRouter.post("/", createPremium);
premiumRouter.put("/", renewPremium);
premiumRouter.get("/", getPremium); // Obtener un Premium específico (por user_id o premium_id)
premiumRouter.get("/all", getAllPremiumUsers);

module.exports = premiumRouter;
