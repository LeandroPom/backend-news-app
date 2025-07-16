const { Router } = require('express');
const handlerGetAllUsers = require('../handlers/user/handlerGetAllUsers');
const handlerCreateUser = require('../handlers/user/handlerCreateUser');
const handlerUpdateUser = require('../handlers/user/handlerUpdateUser');
const handlerBlockUser = require('../handlers/user/handlerBlockUser');
const handlerDeleteUser = require('../handlers/user/handlerDeleteUser');


const userRouter = Router();


userRouter.get('/', handlerGetAllUsers);
userRouter.post('/', handlerCreateUser);
userRouter.put('/:id', handlerUpdateUser);
userRouter.delete('/block/:id', handlerBlockUser);
userRouter.delete('/:id', handlerDeleteUser);

module.exports = userRouter;
