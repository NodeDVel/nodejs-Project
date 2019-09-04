const randomstring = require('randomstring');
const { User } = require('../../../database').User;
const CustomError = require('../../../CustomError');

const createKey = async (req, res, next) => {
    const { info } = req.body;
    
    const key = await randomstring.generate({
        charset: 'alphanumeric',
        length: 7,
    });

    
}

module.exports = createKey;