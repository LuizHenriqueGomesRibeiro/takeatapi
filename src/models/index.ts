import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';

import sequelize from '../config/database';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db: {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
} = {
    sequelize,
    Sequelize,
};

const files = fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.ts' && file.endsWith('.ts'));

for (const file of files) {
    const model = await import(`./${file}`);
    const modelInstance = model.default(sequelize);
    db[modelInstance.name] = modelInstance;
}

db.Order.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });
db.Order.belongsTo(db.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
db.Order.belongsTo(db.Buyer, { foreignKey: 'buyerId', as: 'buyer' });

export { db };