const { Router } = require('express');
const GetAllUsers = require('../controllers/user/getAllUsers');



const userRouter = Router();


userRouter.get('/', GetAllUsers);


module.exports = userRouter;
