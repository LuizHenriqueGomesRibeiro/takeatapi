import { DataTypes, Model } from 'sequelize';
import { Restaurant } from '../restaurant';
export class Product extends Model {
}
export default (sequelize) => {
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Restaurants',
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
        tableName: 'Products',
        timestamps: true,
        underscored: true,
    });
    Product.belongsTo(Restaurant, {
        foreignKey: 'restaurant_id',
        as: 'restaurant',
    });
    return Product;
};
