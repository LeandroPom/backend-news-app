const { Router } = require('express');
const router = Router();


const postRouter = require('./post.routes');



router.use((req, res, next) => {
    console.log(`Solicitud a la ruta: ${req.url}`);
    next();
});


router.use('/posts', postRouter);



module.exports = router;
