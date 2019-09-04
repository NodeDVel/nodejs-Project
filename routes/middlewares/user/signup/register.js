const { User } = require('../../../../database').User;
const CustomEror = require('../../../../CustomError');
const register = async (req, res, next) => {
    
    const { id, password, name } = req.body;
    try{
        await User.findOne({
            where: {
                id,
            }
        }).then(result => {
            if(!result) {
                next(CustomEror(403, '알 수 없는 이유입니다'));
            } else {
                await User.create({
                    id: id,
                    password: password,
                    name: name,
                });
            }
        }).catch(err => {
            console.error(err);
            next(CustomEror(500, '데이터베이스 오류'));
        });

        // if(findId){
        //     return res.send('이미 가입된 아이디입니다.').redirect('/signup');
        // } else {
        //     await User.create({
        //         id: id,
        //         password: password,
        //         name: name,
        //     });
        //     return res.redirect('/');
        // }

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 에러',
        });
    }
};

module.exports = register;