const CustomError = require('../../../../CustomError');

const loginReqCheck = (req, res, next) => {
    const { id, password } = req.body
  
    if (!id || !password) {
      next(CustomError(400, '잘못된 요청데이터입니다.'))
    } else {
      next()
    }
  }
  
  module.exports = loginReqCheck;