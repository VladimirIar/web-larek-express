import { Router } from 'express';
import { getProduct, createProduct } from '../controllers/products';
import { validateProduct } from '../middlewares/validatons';

const router = Router();

router.get('/', getProduct);
router.post('/', validateProduct, createProduct);

export default router;
