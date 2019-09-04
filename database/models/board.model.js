module.exports = (sequelize, DataTypes) => {
  const board = sequelize.define(
    'Board', 
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
    title: {
      type:  DataTypes.STRING,
      allowNull: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },)
  return board;
}