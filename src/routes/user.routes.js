const { Router } = require('express');
const getAllUsers = require('../controllers/user/getAllUsers');
const getByIdUser = require('../handlers/user/handlerGetByIdUser');
const getByNameUser = require('../handlers/user/handlerGetByNameUser');



const userRouter = Router();


userRouter.get('/', getAllUsers);
userRouter.get('/search', getByNameUser);
userRouter.get('/:id', getByIdUser);


module.exports = userRouter;
