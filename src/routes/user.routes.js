const { Router } = require('express');
const getAllUsers = require('../handlers/user/getAllUsersHandler');
const getByIdUser = require('../handlers/user/handlerGetByIdUser');
const getByNameUser = require('../handlers/user/handlerGetByNameUser');
const editUser = require("../handlers/user/editUserHandler");
const adminEditUser = require("../handlers/user/adminEditUserHandler");
const activeUser = require("../handlers/user/activeUserHandler");
const deleteUser = require("../handlers/user/deleteUserHandler");


const userRouter = Router();


userRouter.get('/', getAllUsers);
userRouter.get('/search', getByNameUser);
userRouter.get('/:id', getByIdUser);
userRouter.put("/:id", editUser);
userRouter.put("/admin/:id", adminEditUser);
userRouter.patch("/:id/active", activeUser);
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;
