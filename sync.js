const sequelize = require('./config/database');
const Livro = require('./models/Livro');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado ao banco com sucesso');

    await sequelize.sync({ alter: true });
    console.log('✅ Sincronização realizada com sucesso');

    process.exit(0);
  } catch (error) {
    console.error('🔴 Erro ao sincronizar o banco:', error);
    process.exit(1);
  }
})();
