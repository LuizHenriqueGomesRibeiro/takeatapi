import { DataTypes, Model } from 'sequelize';
export class Buyer extends Model {
}
export default (sequelize) => {
    Buyer.init({
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
        sequelize,
        tableName: 'Buyers',
        timestamps: true,
        underscored: true,
    });
    return Buyer;
};
