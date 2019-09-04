module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User', 
    {
        pk: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        money: {
            type: DataTypes.INTEGER,
        },
        sign: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        class: DataTypes.STRING,
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },)
    return User;
}