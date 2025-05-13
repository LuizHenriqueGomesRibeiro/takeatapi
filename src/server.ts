import 'dotenv/config';
import express from 'express';
import { db } from './models';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', async (_, res) => {
  try {
    const users = await db.User.findAll();
    res.json(users);
  } catch (err) {
    console.error('❌ Erro ao buscar usuários:', err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

db.sequelize.sync({ force: true })
  .then(() => {
    console.log('🟢 Tabelas criadas/sincronizadas com sucesso');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Erro ao sincronizar tabelas:', err);
});