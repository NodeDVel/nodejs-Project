const router = require('express').Router();

//회원가입
router.post('/signup', require('../middlewares/user/signup/CheckPassword'));
router.post('/signup', require('../middlewares/user/signup/Checkid'));
router.post('/signup', require('../middlewares/user/signup/register'));
router.post('/signup', require('../middlewares/user/common/passwordEncryption'));

//로그인
router.post('/login', require('../middlewares/user/signup/CheckPassword'));
router.post('/login', require('../middlewares/user/signup/Checkid'));
router.post('/login', require('../middlewares/user/login/login'));
router.post('/login', require('../middlewares/jwt/issueToken'));
router.post('/login', require('../middlewares/user/common/passwordEncryption'));

module.exports = router;