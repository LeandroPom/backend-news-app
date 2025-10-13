const { Router } = require('express');
const handlerLogin = require('../controllers/auth/login');
const handlerRegister = require('../controllers/auth/register');

const authRouter = Router();

authRouter.post('/login', handlerLogin);
authRouter.post('/register', handlerRegister);

module.exports = authRouter;
