const router = require('express').Router();

router.post('/buy', require('../middlewares/store/buy'));
router.post('/buy', require('../middlewares/store/CreateStore'));

module.exports = router;