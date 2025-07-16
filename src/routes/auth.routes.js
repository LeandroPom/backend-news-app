const { Router } = require('express');
const handlerRegister = require('../handlers/auth/handlerRegister');
const handlerLogin = require('../handlers/auth/handlerLogin');

const router = Router();

router.post('/register', handlerRegister);
router.post('/login', handlerLogin);

module.exports = router;
