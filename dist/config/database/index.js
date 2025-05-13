import { Sequelize } from "sequelize";
const sequelize = new Sequelize('takeat', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});
export default sequelize;
