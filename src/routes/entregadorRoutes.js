import express from 'express';
import * as entregadorController from '../controllers/entregadorController.js';
import validate from '../middlewares/validate.js';
import { entregadorCreateSchema, entregadorUpdateSchema } from '../controllers/entregadorController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', validate(entregadorCreateSchema), entregadorController.adicionarEntregador);

router.use(authMiddleware);


router.get('/', entregadorController.listarEntregador);


router.put('/:idItem', validate(entregadorUpdateSchema), entregadorController.atualizarEntregador);


router.delete('/:idItem', entregadorController.deletarEntregador);
export default router;