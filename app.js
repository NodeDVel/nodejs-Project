const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./database').sequelize;
const CustomErorr = require('./CustomError');

dotenv.config();

const app = express();
sequelize.sync();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', require('./routes/controllers/user.controllers'));
app.use('/board', require('./routes/controllers/Board.controllers'));
app.use('/store', require('./routes/controllers/store.controllers'));

app.use(function(req, res, next) {
  next(CustomErorr(404, 'Error'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

const port = 8000;
app.listen(port, function () { console.log('Updated : Server listening at port %d', port); }); 

module.exports = app;