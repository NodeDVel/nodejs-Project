module.exports = (sequelize, DataTypes) => {
    const Hastag = sequelize.define(
        'Hastag', 
    {
        pk: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        }, {
            timestamps: true,
            paranoid: true,
        });
    return Hastag;
};