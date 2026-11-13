import express from 'express';
import * as itempedidoController from '../controllers/itempedidoController.js';
import validate from '../middlewares/validate.js';
import { itempedidoCreateSchema, itempedidoUpdateSchema } from '../controllers/itempedidoController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', validate(itempedidoCreateSchema), itempedidoController.adicionaritempedido);

router.use(authMiddleware);


router.get('/', itempedidoController.listaritempedidos);


router.put('/:idItem', validate(itempedidoUpdateSchema), itempedidoController.atualizaritempedido);


router.delete('/:idItem', itempedidoController.deletaritempedido);
export default router;