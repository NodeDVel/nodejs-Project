module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define('Store', {
        store_id: {
            primaryKey: true,
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Store;
};