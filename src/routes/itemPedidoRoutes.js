import express from 'express';
import * as itemPedidoController from '../controllers/itemPedidoController.js';
import validate from '../middlewares/validate.js';
import { itemPedidoCreateSchema, itemPedidoUpdateSchema } from '../controllers/itemPedidoController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', validate(itemPedidoCreateSchema), itemPedidoController.adicionarItemPedido);

router.use(authMiddleware);


router.get('/', itemPedidoController.listarItemPedidos);


router.put('/:idItem', validate(itemPedidoUpdateSchema), itemPedidoController.atualizarItemPedido);


router.delete('/:idItem', itemPedidoController.deletarItemPedido);
export default router;