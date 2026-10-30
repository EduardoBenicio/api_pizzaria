
import * as pedidoService from '../services/pedidoService.js';
import Joi from 'joi';

// Schema para criação de pedido
export const pedidoCreateSchema = Joi.object({
  valorTotal: Joi.number().positive().required(),
  formaPagamento: Joi.string().max(10).required(),
  statusPedido: Joi.string().max(30).optional(),
  formaEntrega: Joi.string().max(15).required(),
  cpf: Joi.string().length(11).required(),
  idEntregador: Joi.number().integer().positive().required()
});


// Schema para atualização de pedido
export const pedidoUpdateSchema = Joi.object({
  valorTotal: Joi.number().positive().optional(),
  formaPagamento: Joi.string().max(10).optional(),
  statusPedido: Joi.string().max(30).optional(),
  formaEntrega: Joi.string().max(15).optional(),
  cpf: Joi.string().length(11).optional(),
}).min(1);


// Listar pedidos
export const findAll = async (req, res) => {
  try {
    const { idPedido, cpf, statusPedido } = req.query;

    const pedidos = await pedidoService.findAll(
      idPedido,
      cpf,
      statusPedido
    );

    res.status(200).json(pedidos);

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao buscar pedidos.',
      error: error.message
    });
  }
};


// Criar pedido
export const create = async (req, res) => {
  try {
    const { error } = pedidoCreateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const pedido = await pedidoService.create(req.body);

    res.status(201).json(pedido);

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao criar pedido.',
      error: error.message
    });
  }
};


// Atualizar pedido
export const update = async (req, res) => {
  try {
    const { error } = pedidoUpdateSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const atualizado = await pedidoService.update(
      req.params.idPedido,
      req.body
    );

    if (!atualizado) {
      return res.status(404).json({
        message: 'Pedido não encontrado.'
      });
    }

    res.status(200).json({
      message: 'Pedido atualizado com sucesso.'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao atualizar pedido.',
      error: error.message
    });
  }
};


// Remover pedido
export const remove = async (req, res) => {
  try {
    const removido = await pedidoService.remove(
      req.params.idPedido
    );

    if (!removido) {
      return res.status(404).json({
        message: 'Pedido não encontrado.'
      });
    }

    res.status(200).json({
      message: 'Pedido removido com sucesso.'
    });

  } catch (error) {
    res.status(500).json({
      message: 'Erro ao remover pedido.',
      error: error.message
    });
  }
};
