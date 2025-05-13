import { DataTypes, Model } from 'sequelize';
import { Restaurant } from '../restaurant';
import { Product } from '../product';
import { Buyer } from '../buyer';
export class Order extends Model {
}
export default (sequelize) => {
    Order.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id',
            },
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalServicePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'restaurants',
                key: 'id',
            },
        },
        buyer_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'buyers',
                key: 'id',
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        canceled_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'orders',
        timestamps: true,
        underscored: true,
    });
    Order.belongsTo(Product, {
        foreignKey: 'product_id',
        as: 'product',
    });
    Order.belongsTo(Restaurant, {
        foreignKey: 'restaurant_id',
        as: 'restaurant',
    });
    Order.belongsTo(Buyer, {
        foreignKey: 'buyer_id',
        as: 'buyer',
    });
    return Order;
};
