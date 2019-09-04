module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define(
      'boardLike',
      {
        pk: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        user_pk: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        board_pk: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        charset: 'utf8',
        collate: 'utf8_unicode_ci',
      }
    );
  };
  