const { Store } = require('../../../database').Store;
const CustomError = require('../../../CustomError');

const CreateStore = async (req, res, next) => {
    try {
        await Store.findOne({
            where: { store_id, }
        }).then(result => {
            if(!result){
                next(CustomError(400, '잘못된 요청데이터입니다'));
            } else {
                await Store.create({
                    store_id,
                    price,
                    content,
                }).then(result => {
                    res.locals.store_info = {
                        store_id: result.dataValues.store_id,
                        price: result.dataValues.price,
                    }
                }).catch(err => {
                    console.log(err);
                    next(CustomError(500, '데이터베이스 오류'));
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        });
    }
};

module.exports = CreateStore;