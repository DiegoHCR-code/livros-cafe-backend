const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');

// GET: Listar todos os livros
router.get('/', async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// POST: Adicionar novo livro
router.post('/', async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar livro' });
  }
});

// DELETE: Remover livro por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Livro.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar livro' });
  }
});

module.exports = router;
