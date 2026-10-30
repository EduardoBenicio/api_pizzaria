import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';

const itemSchema = Joi.object({
  idProduto: Joi.number().integer().positive().required(),
  qtdeItens: Joi.number().integer().positive().required(),
});

export const pedidoCreateSchema = Joi.object({
  formaPagamento: Joi.string().max(10).required(),
  formaEntrega: Joi.string().max(15).required(),
  cpf: Joi.string().length(11).required(),
  idEntregador: Joi.number().integer().positive().required(),
  statusPedido: Joi.string().max(30),
  itens: Joi.array().items(itemSchema).min(1).required(),
});

export const pedidoUpdateSchema = Joi.object({
  formaPagamento: Joi.string().max(10),
  formaEntrega: Joi.string().max(15),
  cpf: Joi.string().length(11),
  idEntregador: Joi.number().integer().positive(),
  statusPedido: Joi.string().max(30).allow(null, ''),
  itens: Joi.array().items(itemSchema).min(1),
}).min(1);

export const listarPedidos = async (req, res) => {
  try {
    const { idPedido, cpf, statusPedido } = req.query;
    const pedidos = await pedidoService.findAll(idPedido, cpf, statusPedido);
    res.json(pedidos);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const adicionarPedido = async (req, res) => {
  try {
    const novoPedido = await pedidoService.create(req.body);
    res.status(201).json({
      message: 'Pedido adicionado com sucesso',
      data: novoPedido,
    });
  } catch (err) {
    console.error('Erro ao adicionar pedido:', err);

    if (err.code === 'PRODUCT_NOT_FOUND') {
      return res.status(400).json({ error: err.message });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        error: 'Cliente ou entregador informado não encontrado.',
      });
    }

    res.status(500).json({ error: 'Erro ao adicionar pedido' });
  }
};

export const atualizarPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;
    const updated = await pedidoService.update(idPedido, req.body);

    if (!updated) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.status(200).json({ message: 'Pedido atualizado com sucesso' });
  } catch (err) {
    console.error('Erro ao atualizar pedido:', err);

    if (err.code === 'PRODUCT_NOT_FOUND') {
      return res.status(400).json({ error: err.message });
    }

    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        error: 'Cliente ou entregador informado não encontrado.',
      });
    }

    res.status(500).json({ error: 'Erro ao atualizar pedido' });
  }
};

export const deletarPedido = async (req, res) => {
  try {
    const { idPedido } = req.params;
    const deleted = await pedidoService.remove(idPedido);

    if (!deleted) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.status(200).json({ message: 'Pedido deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar pedido:', err);
    res.status(500).json({ error: 'Erro ao deletar pedido' });
  }
};
