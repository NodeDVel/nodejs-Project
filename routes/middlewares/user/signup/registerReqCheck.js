const CustomError = require('../../../../CustomError');

const signupReqCheck = (req, res, next) => {
    const { id, password } = req.body;
    if (!id || !password) {
      next(CustomError(500, '데이터베이스 오류'));
    } else {
      next()
    }
  }
  
module.exports = signupReqCheck;