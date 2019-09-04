const  { body } = require('express-validator');
const { id, password, name } = require('../../../../config/pattern.json');

const registerValidation =(req, res, next) => [
    body('id')
        .isString().matches(id),
    body('password')
        .isString().matches(password),
    body('name')
        .isString().matches(name),
];

module.exports = registerValidation;