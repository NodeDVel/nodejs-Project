const { User } = require('../../../../database').User;
const CustomError = require('../../../../CustomError');

const Checkid = async (req, res, next) => {
    const { id, password, name } = req.body;
    try {
        if (!id) {
            next(CustomError(400, '잘못된 요청'));
        } else {
            await User.findOne({
                where: { id, },
            }).then(result => {
                if (!result) {
                    switch (req.path) {
                     case '/login':
                        next(CustomError(400, '잘못된 요청'));
                        break;
                     default:
                        next();
                        break;
                    }
                } else {
                    switch(req.path) {
                     case '/login':
                        next();
                        break;
                     default:
                        next(CustomError(400, '사용 중인 아이디'));
                        break;
                    }
                }
            });
        }
    } catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        })
    }
};

module.exports = Checkid;