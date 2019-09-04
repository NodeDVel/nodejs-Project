const CustomError = require('../../../../CustomError');

const CheckPassword = (req, res, next) => {
    const { password } = req.body;

    try {
        if (!password) {
            switch (req.path) {
             case '/login' :
                next(CustomError(400, '잘못된 요청'));
                break;

             default: 
                next(CustomError(400, '잘못된 요청'));
                break;
            }    
        } else {
            next()
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        })
    }
};

module.exports = CheckPassword;
// const CustomError = require('../../../../customError');

// const CheckPassword = (req, res, next) => {
//     const { id, password, name } = req.body;

//     try {
//         if(!password) {
//             switch (req.path) {
//              case '/login':
//                 next(CustomError(400, '잘못된 요청'));
//                 break;

//              default:
//                 next(CustomError(400, '비밀번호를 입력 X'));
//                 break;
//             }
//         } else {
//             next();
//         }

//         if(user.password === temp.password) {
//             res.locals.user = {
//                 id: id,
//                 password: password,
//                 name: name,
//             }
//             next();
//         } else {
//             res.status(412).json({
//                 success: false,
//                 message: '존재하지 않은 데이터입니다',
//             })
//         }
//     } catch(err) {
//         console.error(err);
//         res.status(412).json({
//             success: false,
//             message: '데이터베이스 오류',
//         })
//     }
// }

// module.exports = CheckPassword;