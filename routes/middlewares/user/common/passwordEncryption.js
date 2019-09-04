const crypto = require('crypto');
const randomstring = require('randomstring');
const CustomError = require('../../../../CustomError');
const { User } = require('../../../../database').User;

const passwordEncryption = (req, res, next) => {
    const { password } = req.body.password || req.query.password;
    crypto.randomBytes(64, (randomBytesError, buf) => {
        if(randomBytesError) {
            console.log(randomBytesError);
            next(CustomError(403, '알 수 없는 오류입니다'));
        } else {
            const bufBase64 = buf.toString('base64');
            crypto.pbkdf2(password, bufBase64, 427832, 64, 'sha512', (pbkdf2Error, pwEncrypted) => {
                if(pbkdf2Error) {
                    console.log(pbkdf2Error);
                    next(CustomError(403, '알 수 없는 오류입니다'));
                } else {
                    User.update({
                        sign: true,
                        id: id,
                        password: pwEncrypted.toString('base64'),
                        secret: bufBase64,
                    }).catch(err => {
                        console.error(err);
                        next(CustomError(500, '데이터베이스 오류'));
                    });
                    res.json({
                        success: true,
                    });
                }
            });
        }
    });
}

module.exports = passwordEncryption;