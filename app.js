const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sequelize = require('./config/database');
const livroRoutes = require('./routes/livroRoutes');
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middlewares/auth'); // Middleware JWT

const app = express();

// ─── Middlewares Globais ─────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Rotas públicas ──────────────────────────────────────────
app.use('/api/auth', authRoutes);

// ─── Rotas protegidas ────────────────────────────────────────
app.use('/api/livros', verifyToken, livroRoutes);

// ─── Health Check ────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.send('📚 Livros & Café API está rodando!');
});

// ─── Servir Frontend (se usar build do React) ───────────────
// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (_req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// ─── Inicializa o Servidor e conecta com banco ───────────────
const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conectado ao banco de dados com sucesso!');
    await sequelize.sync({ alter: true });
    console.log('📦 Tabelas sincronizadas');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
})();
