import 'dotenv/config';
import express from 'express';
import { db } from './models';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log('🟢 Tabelas criadas/sincronizadas com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar tabelas:', err);
  });
