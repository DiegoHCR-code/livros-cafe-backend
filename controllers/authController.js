const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // ← inclui role aqui

    const exists = await Usuario.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email já cadastrado' });

    const hashed = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      name,
      email,
      password: hashed,
      role // ← salva o role corretamente
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (err) {
    console.error('❌ ERRO INTERNO NO REGISTER:', err);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Usuario.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Senha incorreta' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (err) {
    console.error('❌ ERRO INTERNO NO LOGIN:', err);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
