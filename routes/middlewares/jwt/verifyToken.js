const jwt = require('jsonwebtoken');
const { User } = require('../../../database').User;
const CustomError = require('../../../CustomError');

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    try {
        if(token) {
            const token_secret = process.env.TOKEN_SECRET;
            const pk = jwt.verify(token, token_secret, (err, decode) => {
                if(err){
                    next(CustomError(404, '잘못된 요청데이터입니다'));
                } else {
                    User.findOne({
                        where: { id: decode.id, name: decode.name, sign: true, }
                    }).then(result => {
                        if(!result) {
                            next(CustomError(404, '잘못된 요청데이터입니다'));
                        } else {
                            const user = result.dataValues;
                            res.locals.user = {
                                pk: user.pk,
                                id: user.id,
                                password: user.password,
                                name: user.name,
                                money: user.money,
                            }
                        }
                    });
                }
            }).pk;
        

        const pk = await User.findOne({
            where: {
                pk: pk,
            }
        });

        if(pk){
            res.locals.user = pk;
            next();
        } else {
            res.status(403).json({
                success: false,
                message: '권한이 없습니다',
            })
        }
        } else {
            res.status(401).json({
                success: false,
                message: '토큰이 없습니다',
            })
        }
    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        })
    }
};

module.exports = verifyToken;