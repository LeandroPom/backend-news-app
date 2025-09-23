const { Router } = require('express');
const handlerLogin = require('../controllers/auth/login');
const handlerRegister = require('../controllers/auth/register');

const router = Router();

router.post('/login', handlerLogin);
router.post('/register', handlerRegister);

module.exports = router;
