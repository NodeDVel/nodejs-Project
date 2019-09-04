const { Board } =  require('../../../../database').Board;
const CusotmError = require('../../../../CustomError');

const CreateBoardContent = async (req, res, next) => {
    const user = res.locals.user;
    const { title, content } = req.body;

    try {
        if(title && content){
            const boardcontent = await Board.create({
                    title: title,
                    comment: comment,    
            }).then(result => {
                res.locals.board = {
                    title: result.dataVaules.title,
                }
                    
            });

            console.log(boardcontent);
            next();
        } else {
            next(CusotmError(500, '데이터베이스 오류'));
        }
    } catch(Err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        })
    }
}

module.exports = CreateBoardContent;