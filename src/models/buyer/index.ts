import { DataTypes, Model, Sequelize } from 'sequelize';

export class Buyer extends Model {
    public id!: number;
    public name?: string;
    public phone!: string;
    public created_at!: Date;
}

export default (sequelize: Sequelize) => {
    Buyer.init(
        {
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
        },
        {
            sequelize,
            tableName: 'Buyers',
            timestamps: true,
            underscored: true,
        }
    );

    return Buyer;
};