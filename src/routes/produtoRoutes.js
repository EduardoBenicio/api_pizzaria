import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validate from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js';

import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();


router.post('/', validate(produtoCreateSchema), produtoController.adicionarProduto);

router.use(authMiddleware);


router.get('/', produtoController.listarProdutos);


router.put('/:idProduto', validate(produtoUpdateSchema), produtoController.atualizarProduto);


router.delete('/:idProduto', produtoController.deletarProduto);
export default router;