import express from 'express';
import * as itemPedidoController from '../controllers/itemPedidoController.js';
import validate from '../middlewares/validate.js';
import { itemPedidoCreateSchema, itemPedidoUpdateSchema } from '../controllers/itemPedidoController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', validate(itemPedidoCreateSchema), itemPedidoController.adicionaritempedido);

router.use(authMiddleware);


router.get('/', itemPedidoController.listaritempedidos);


router.put('/:idItem', validate(itemPedidoUpdateSchema), itemPedidoController.atualizaritempedido);


router.delete('/:idItem', itemPedidoController.deletaritempedido);
export default router;