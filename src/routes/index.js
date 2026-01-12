const { Router } = require('express');
const router = Router();

const tagRouter = require('./tag.routes');
const authRouter = require('./auth.routes');
const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const ratingRouter = require('./rating.routes');
const bannerRouter = require('./banner.routes');
const paymentRouter = require('./payment.routes');
const premiumRouter = require('./premium.routes');
const productRouter = require('./product.routes');



router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});



router.use('/tags', tagRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/ratings', ratingRouter);
router.use('/banners', bannerRouter);
router.use('/payments', paymentRouter);
router.use('/premiums', premiumRouter);
router.use('/products', productRouter);


module.exports = router;
