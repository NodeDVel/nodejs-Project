module.exports = (sequleize, DataTypes) => {
    const Charge = sequelize.define('Charge', {
        money: {
            type: DataTypes.INTEGER,
        },
        moneyBefore: DataTypes.INTEGER,
        moneyAfter: DataTypes.INTEGER,
    });
    return Charge;
};