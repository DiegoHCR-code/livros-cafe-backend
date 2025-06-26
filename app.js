const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const livroRoutes = require('./routes/livroRoutes'); // Corrigido: sem espaço extra
const sequelize = require('./config/database');

const app = express();

// ─── Middlewares Globais ─────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Rotas da API ────────────────────────────────────────────
app.use('/api/livros', livroRoutes);

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.send('📚 Livros & Café API está rodando!');
});

// ─── Servir Frontend (se usar build do React) ────────────────
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// ─── Inicializa o Servidor ───────────────────────────────────
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado ao banco de dados com sucesso!');
    await sequelize.sync({ alter: true }); // Cria tabelas automaticamente
    console.log('📦 Tabelas sincronizadas');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
})();
