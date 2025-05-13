import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Importa a configuração do Sequelize
import sequelize from '../config/database';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define a interface do db para armazenar os modelos e a instância do Sequelize
const db: {
    [key: string]: any;
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
} = {
    sequelize,
    Sequelize,
};

// Carrega todos os arquivos de modelos (exceto o próprio index.ts)
const files = fs
    .readdirSync(__dirname)
    .filter(file => file !== 'index.ts' && file.endsWith('.ts'));

// Carrega os modelos dinamicamente usando importação dinâmica (ESM)
for (const file of files) {
    const model = await import(`./${file}`);
    const modelInstance = model.default(sequelize);
    db[modelInstance.name] = modelInstance;
}

// Definindo os relacionamentos entre os modelos
db.Order.belongsTo(db.Product, { foreignKey: 'productId', as: 'product' });
db.Order.belongsTo(db.Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
db.Order.belongsTo(db.Buyer, { foreignKey: 'buyerId', as: 'buyer' });

export { db };
