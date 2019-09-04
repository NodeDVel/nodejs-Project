const model = require('../../../database').User;
const Store = require('../../../database').Store;
const CustomError = require('../../../CustomError');

const buy = async (req, res, next) => {
    try {
        await model.User.findOne({
            where: { id: model.id, money: model.money },
        }).then(result => {
            if(!result) {
                next(CustomError(404, '잘못된 요청데이터입니다'));
            } else {
                const userMoney = result.dataValues.money;
                userMoney = 10000;
                console.log("현재 가지고 있는 돈", userMoney);
                await Store.findOne({
                    where: { store_id: res.locals.store_info.store_id, price: res.locals.store_info.price },
                }).then(result => {
                    if(!result){
                        next(CustomError(404, '잘못된 요청데이터입니다'));
                    } else {
                        const sumMoney = 0;
                        if(userMoney > result.dataValues.price) {
                            sumMoney = userMoney - result.dataValues.price;
                        } else if (userMoney < result.dataValues.price) {
                            next(CustomError(404, '현재 가지고 있는 돈이 부족합니다'));
                        } else {
                            next(CustomError(404, '돈이 0원입니다. 충전해주십시오'));
                        }
                        console.log("구매하고 남은 돈:", sumMoney);
                    }
                }).catch(err => {
                    console.error(err);
                    next(CustomError(500, '데이터베이스 오류'));
                });
            }
        });
    } catch (err) {
        console.error(err);
        next(CustomError(404, '잘못된 요청데이터입니다'));
    }
}

module.exports = buy;