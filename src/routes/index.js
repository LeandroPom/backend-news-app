const { Router } = require('express');
const router = Router();

const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
const ratingRouter = require('./rating.routes');
const tagRouter = require('./tag.routes');
const authRouter = require('./auth.routes');



router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});



router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/ratings', ratingRouter);
router.use('/tags', tagRouter);
router.use('/auth', authRouter);


module.exports = router;
