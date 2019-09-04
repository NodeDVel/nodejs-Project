const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require('./models/user.model')(sequelize, Sequelize);
db.Board = require('./models/board.model')(sequelize, Sequelize);
db.Hastag = require('./models/hastag.model')(sequelize, Sequelize);
db.Store = require('./models/store.model')(Sequelize, sequelize);
db.Chare = require('./models/store_charge.model')(Sequelize, sequelize);
db.Like = require('./models/like.model')(Sequelize, sequelize)

db.User.hasMany(db.Board, { foreignKey: 'user_pk', sourceKey: 'pk' });
db.Board.hasMany(db.Hastag, { foreignKey: 'user_pk', sourceKey: 'pk' });
db.Board.hasMany(db.Like, { foreignKey: 'board_pk', sourceKey: 'pk'});

db.Like.belongsTo(db.Board, { foreignKey: 'board_pk', sourceKey: 'pk'});
db.Board.belongsTo(db.User, { foreignKey: 'user_pk', targetKey: 'pk' });
db.Hastag.belongsTo(db.Board, { foreignKey: 'user_pk', targetKey: 'pk' });

module.exports = db;