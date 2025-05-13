import app from './app';
import { db } from './models';
const PORT = process.env.PORT;
db.sequelize.sync({ force: false }).then(() => {
    console.log('Banco sincronizado');
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(console.error);
