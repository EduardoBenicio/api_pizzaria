import express from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import validate from '../middlewares/validate.js';
import {
  pedidoCreateSchema,
  pedidoUpdateSchema,
} from '../controllers/pedidoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Todas as rotas de pedidos exigem autenticação.
router.use(authMiddleware);

router.get('/', pedidoController.listarPedidos);
router.post('/', validate(pedidoCreateSchema), pedidoController.adicionarPedido);
router.put('/:idPedido', validate(pedidoUpdateSchema), pedidoController.atualizarPedido);
router.delete('/:idPedido', pedidoController.deletarPedido);

export default router;
