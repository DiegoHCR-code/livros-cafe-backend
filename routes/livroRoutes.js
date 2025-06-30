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

router.post('/finalizar-compra', async (req, res) => {
  try {
    const itens = req.body; // [{ id, quantity }]
    for (const item of itens) {
      const livro = await Livro.findByPk(item.id);
      if (!livro || livro.quantidade < item.quantity) {
        return res.status(400).json({ error: `Livro "${livro?.title}" fora de estoque ou insuficiente.` });
      }
    }

    // Se todos disponíveis, abate o estoque
    for (const item of itens) {
      const livro = await Livro.findByPk(item.id);
      await livro.update({ quantidade: livro.quantidade - item.quantity });
    }

    res.json({ message: 'Compra finalizada com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao finalizar compra' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const livro = await Livro.findByPk(id);
    if (!livro) return res.status(404).json({ error: 'Livro não encontrado' });

    await livro.update(req.body);
    res.json(livro);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao atualizar livro' });
  }
});


module.exports = router;
