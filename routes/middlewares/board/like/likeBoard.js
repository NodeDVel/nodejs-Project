const Board = require('../../../../database').Board;
const Like = require('../../../../database').Like;
const CustomError = require('../../../../CustomError');

const likeBoard = async (req, res, next) => {
    const board_pk = req.query.board_pk;
    const user = res.locals.user;

    try {
        const board = await Board.findOne({
            where: {
                pk: board_pk,
            },
        }).then(result => {
            if(!result) {
                next(CustomError(500, '데이터베이스 오류'));
            }
        }).catch(err => {
            console.error(err);
            next(CustomError(403, '알 수 없는 오류'));
        });

        if(board){
            const like = await Like.findOne({
                where: {
                    user_pk: user.pk,
                    board_pk,
                },
            }).then(result => {
                if(!result) {
                    next(CustomError(500, '데이터베이스 오류'));
                }
            });
        
        like
        ? await BoardLike.destroy({ where: { user_pk: user.pk, board_pk: board_pk } })
        : await BoardLike.create({ user_pk: user.pk, board_pk: board_pk }).then(result => {
            if(!result) {
                next(CustomError(500, '데이터베이스 오류'));
            } else {
                next();
            }
        })

      res.json({
        success: true,
      });
        } else {
            next(CustomError(404, '게시글을 찾을 수 없습니다'));
        }

    } catch(err){
        console.error(err);
        next(CustomError(500, '데이터베이스 오류'));
    }
}

module.exports = likeBoard;