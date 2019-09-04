// const Board = require('../../../../database').Board;
// const CustomError = require('../../../../CustomError');

// const getBoardList = async (req, res, next) => {    
//     const boardtitle = req.query.title;
    
//     try {
//         if(boardtitle){
//             await Board.findAll({
//                 where: { title: boardtitle, }
//             });
//         for(const i = 0;  i < boardtitle.length; i++){
//             res.send(boardtitle);
//         }
//         } else {
//             next(CustomErorr(400, '잘못된 요청데이터입니다'));
//             res.json({
//                 message: '게시물 x',
//             });
//         }

//         res.json({
//             success: true,
//             data: {
//                 board: {
//                     pk: boardcontent,
//                     title: boardcontent.title,
//                     comment: boardcontent.content,
//                 },
//             },
//         });
//     } catch(err) {
//         console.log(err);
//         res.status(500).json({
//             success: false,
//             message: '데이터베이스 오류',
            
//         })
//     }
// };

// module.exports = getBoardList;

const Board = require('../../../../database').Board;
const CustomError = require('../../../../CustomError');

const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findAll({
      order: [['createdAt', 'DESC']],
    }).then(result => {
        console.log('db 찾기 성공');
    }).catch(err => {
        console.error(err);
        next(CustomError(500, '데이터베이스 오류'));
    });

    if (board) {
      res.json({
        success: true,
        data: {
          board: board
            ? board.map(val => ({
                pk: val.pk,
                title: val.title,
                content: val.content,
                createdAt: val.createdAt,
                updatedAt: val.updatedAt,
              }))
            : '게시물이 없습니다.',
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: '데이터베이스 에러',
    });
  }
};

module.exports = getBoard;