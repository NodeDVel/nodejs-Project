const Board = require('../../../../database').Board;
const BoardHastag = require('../../../../database').Hastag;
const CustomError = require('../../../../CustomError');

const CreateHastag = async (req, res, next) => { 
    const { hastag } = req.body.hastag;

    try {
        if(hastag){
            for(const i = 0; i < hastag; i++) {
                await BoardHastag.create({
                    title: hastag[i],
                }).then(result => {
                    if (!result) {
                        next(CustomError(400, '잘못된 요청'));
                    }
                });
            }
        } else {
            res.json({
                success: true,
                message: 'hastag가 생성되어 있지 않습니다',
            })
        }
        res.json({
            success: true,
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        });
    }
};

module.exports = CreateHastag;