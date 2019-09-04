const { User } = require('../../../../database').User
const CustomError = require('../../../../CustomError');

const login = (req, res, next) => {
    const { id, password } = req.body;

    const idCheck = () => new Promise(resolve => {
        User.findOne({
            where: { id: id },
        }).then(result => {
            if(!result) {
                next(CustomError(412, '아이디나 비밀번호를 확인해주세여'))
            } else {
                resolve(result.dataValues)
            }
        }).catch((err) =>  {
            console.error(err)
            next(CustomError(500, '데이터베이스오류입니다'));
        })
    })

    const passwordCheck = user => new Promise(() => {
        if (password === user.password) {
            res.locals.user = {
                pk: user.pk,
                id: user.id,
                password: user.password,
                name: user.name,
                money: user.money,
                class: user.class,
            }
        } else {
            next(CustomError(412, '아이디나 비밀번호를 확인해주세여'))
        }
    })

    idCheck().then(passwordCheck);
}

module.exports = login