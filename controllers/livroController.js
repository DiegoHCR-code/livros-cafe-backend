const Livro = require('../models/Livro');

exports.getAllLivros = async (_req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};

exports.createLivro = async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar livro' });
  }
};

exports.deleteLivro = async (req, res) => {
  try {
    const { id } = req.params;
    await Livro.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir livro' });
  }
};