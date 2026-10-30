import * as produtoService from '../services/produtoService.js';
import Joi from 'joi';

export const produtoCreateSchema = Joi.object({
    nomeProduto: Joi.string().required().max(25),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(15),
    valor: Joi.string().required().max(6),
    imagem: Joi.string().required().max(100)
});

export const produtoUpdateSchema = Joi.object({
    nomeProduto: Joi.string().required().max(25),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(15),
    valor: Joi.string().required().max(6),
    imagem: Joi.string().allow(" ").max(100)
}).min(1);

export const listarProdutos = async (req, res) => {
    try {
      const { idProduto, nomeProduto, valorMin, valorMax, tipo } = req.query;
      const produtos = await produtoService.findAll(idProduto, nomeProduto, valorMin, valorMax, tipo);
      res.json(produtos);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const adicionarProduto = async (req, res) => {
  try {
    const novoProduto = await produtoService.create(req.body);
    res.status(201).json({ message: 'Produto adicionado com sucesso', data: novoProduto });
  } catch (err) {
    console.error('Erro ao adicionar cliente:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'IdProduto já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar produto' });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { idProduto} = req.params;
    const updated = await produtoService.update(idProduto, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar produto:', err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { idProduto } = req.params;
    const deleted = await produtoService.remove(idProduto);
    if (!deleted) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }
    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};