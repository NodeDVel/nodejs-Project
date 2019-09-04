const jwt = require('jsonwebtoken');

const issueToken = (req, res, next) => {
    const user = res.locals.user;

    try {

        const token_secret =  process.env.TOKEN_SECRET;
        jwt.sign({ 
            pk: user.pk,
            id: user.id,
            password: password,
         }, token_secret,);

        res.json({
            succes: true,
            data: {
                user_name: user.name,
            },
            token,
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: '데이터베이스 오류',
        })
    }
}

module.exports = issueToken;