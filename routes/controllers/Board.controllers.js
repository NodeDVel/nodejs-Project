const router = require('express').Router();

const getBoardList = require('../middlewares/board/get/getBoardList');

const BoardHastag = require('../middlewares/board/post/CreateHastag');

const CreateBoard = require('../middlewares/board/post/CreateBoard');

const viewHastag = require('../middlewares/board/get/viewHastag');

const likeBoard = require('../middlewares/board/like/likeBoard');

router.post('/board', CreateBoard, getBoardList);
router.post('/board', BoardHastag, viewHastag);
router.post('/board', likeBoard);

module.exports = router;