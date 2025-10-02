// routes/bannerRoutes.js
const { Router } = require("express");
const createBanner = require("../handlers/banner/createBannerHandler");
const getAllBanners = require("../handlers/banner/getAllBannersHandler");
const editBanner = require("../handlers/banner/editBannerHandler");
const activeBanner = require("../handlers/banner/activeBannerHandler");
const deleteBanner = require("../handlers/banner/deleteBannerHandler");

const bannerRouter = Router();

bannerRouter.post("/", createBanner);
bannerRouter.get("/", getAllBanners);
bannerRouter.put("/:id", editBanner);
bannerRouter.patch("/:id/active", activeBanner);
bannerRouter.delete("/:id", deleteBanner);

module.exports = bannerRouter;
