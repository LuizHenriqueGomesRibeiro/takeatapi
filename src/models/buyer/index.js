module.exports = (sequelize, DataTypes) => {
    const Buyer = sequelize.define('Buyer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'buyers',
        timestamps: false,
        underscored: true,
    });

    return Buyer;
};