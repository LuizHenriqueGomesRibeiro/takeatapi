'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
        Order.belongsTo(models.Product, {
            foreignKey: 'product_id',
            as: 'product'
        });

        Order.belongsTo(models.Restaurant, {
            foreignKey: 'restaurant_id',
            as: 'restaurant'
        });

        Order.belongsTo(models.Buyer, {
            foreignKey: 'buyer_id',
            as: 'buyer'
        });
        }
    }

    Order.init({
        id: {
        type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        total_service_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        canceled_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false
    });

    return Order;
};