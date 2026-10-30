import express from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import validate from '../middlewares/validate.js';
import { pedidoCreateSchema, pedidoUpdateSchema } from '../controllers/pedidoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validate(pedidoCreateSchema), pedidoController.create);

router.get('/', pedidoController.findAll);

router.put('/:idPedido', validate(pedidoUpdateSchema), pedidoController.update);

router.delete('/:idPedido', pedidoController.remove);

export default router;