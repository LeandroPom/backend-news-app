const { Router } = require('express');
const getAllUsers = require('../handlers/user/getAllUsersHandler');
const getByIdUser = require('../handlers/user/handlerGetByIdUser');
const getByNameUser = require('../handlers/user/handlerGetByNameUser');



const userRouter = Router();


userRouter.get('/', getAllUsers);
userRouter.get('/search', getByNameUser);
userRouter.get('/:id', getByIdUser);


module.exports = userRouter;
