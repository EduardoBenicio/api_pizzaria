import * as itempedidoService from '../services/itempedidoService.js';
import Joi from 'joi';

export const produtoCreateSchema = Joi.object({
    qtdeItens: Joi.string().required().max(200),
    valorParcial: Joi.string().required().max(10),
    idProduto: Joi.string().required().max(15),
    idPedido: Joi.string().required().max(15),
});

export const produtoUpdateSchema = Joi.object({
    qtdeItens: Joi.string().required().max(200),
    valorParcial: Joi.string().required().max(10),
    idProduto: Joi.string().required().max(15),
    idPedido: Joi.string().required().max(15),
}).min(1);

export const listaritempedidos = async (req, res) => {
    try {
      const { idItem, qtdeItens, valorParcial, idProduto, idPedido } = req.query;
      const produtos = await produtoService.findAll(idItem, qtdeItens, valorParcial, idProduto, idPedido);
      res.json(itens);
    } catch (err) {
      console.error('Erro ao buscar itens:', err);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const adicionaritempedido = async (req, res) => {
  try {
    const novoItem = await itemPedidoService.create(req.body);
    res.status(201).json({ message: 'Item adicionado com sucesso', data: novoItem });
  } catch (err) {
    console.error('Erro ao adicionar item:', err);
    if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'IdItem já cadastrado.' });
    }
    res.status(500).json({ error: 'Erro ao adicionar item' });
  }
};

export const atualizaritempedido = async (req, res) => {
  try {
    const { idItem} = req.params;
    const updated = await itemPedidoService.update(idItem, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'item não encontrado' });
    }
    res.status(200).json({ message: 'Item atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar item:', err);
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
};

export const deletaritempedido = async (req, res) => {
  try {
    const { idItem } = req.params;
    const deleted = await itemPedidoService.remove(idItem);
    if (!deleted) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }
    res.status(200).json({ message: 'Item deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar item:', err);
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
};