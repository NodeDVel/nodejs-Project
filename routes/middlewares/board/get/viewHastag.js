const { Hastag } = require('../../../../database').Hastag;
const CustomError = require('../../../../CustomError');

const viewHastag = async (req, res, next) => {
    const reqTitle = req.query.title;

    await Hastag.findOne({
        where: { title: reqTitle, },
    }).then(result => {
        if(!result) {
            next(CustomError(500, '데이터베이스 오류'));
        } else {
            res.json({
                success: true,
                data: {
                    Hastag: {
                        title: result.dataValues.title,  
                    }
                }
            })
        }
    }).catch(err => {
        console.error(err);
        next(CustomError(404, '잘못된 요청데이터입니다'));
    })
}

module.exports = viewHastag;