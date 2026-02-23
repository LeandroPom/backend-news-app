// routes/premiumRoutes.js
const { Router } = require("express");

const createPremium = require("../handlers/premium/createPremiumHandler");
const getPremium = require("../handlers/premium/getPremiumHandler");
const getAllPremiumUsers = require("../handlers/premium/getAllPremiumUsersHandler");
const grantPremiumManualHandler = require("../handlers/premium/grantPremiumManualHandler");
const togglePremiumBanHandler = require("../handlers/premium/togglePremiumBanHandler");


const premiumRouter = Router();

// 👑 Otorgar Premium manual
premiumRouter.post("/grant", grantPremiumManualHandler);
// 🚫 Toggle ban premium
premiumRouter.post("/ban", togglePremiumBanHandler);

premiumRouter.post("/", createPremium);
premiumRouter.get("/:id", getPremium); // Obtener un Premium específico (por user_id o premium_id)
premiumRouter.get("/", getAllPremiumUsers);

module.exports = premiumRouter;
