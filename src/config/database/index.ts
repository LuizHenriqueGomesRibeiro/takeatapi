import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'takeat',
    'postgres',
    'password',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
        logging: false
    }
)

export default sequelize;