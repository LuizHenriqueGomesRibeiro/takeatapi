import { DataTypes, Model, Sequelize } from 'sequelize';

export class Restaurant extends Model {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public phone!: string;
    public address!: string;
    public has_service_tax!: boolean;
    public created_at!: Date;
    public canceled_at?: Date;
}

export default (sequelize: Sequelize) => {
    Restaurant.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            has_service_tax: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            canceled_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
        sequelize,
        tableName: 'Restaurants',
        timestamps: true,
        underscored: true,
        }
    );

    return Restaurant;
};