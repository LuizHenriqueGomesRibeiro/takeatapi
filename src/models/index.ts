import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import Order from './orders';
import Product from './product';
import Restaurant from './restaurant';
import Buyer from './buyer';

interface Db {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: Db = {
  sequelize,
  Sequelize,
  Order,
  Product,
  Restaurant,
  Buyer,
};

const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.ts' && file.endsWith('.ts'));

for (const file of modelFiles) {
  const modelModule = require(path.join(__dirname, file));
  const model = modelModule.default(sequelize);
  db[model.name] = model;
}

// if (db.Order && db.Product && db.Restaurant && db.Buyer) {
//   db.Order.belongsTo(db.Product, { foreignKey: 'product_id', as: 'product' });
//   db.Order.belongsTo(db.Restaurant, { foreignKey: 'restaurant_id', as: 'restaurant' });
//   db.Order.belongsTo(db.Buyer, { foreignKey: 'buyer_id', as: 'buyer' });
// }

export { db };