import { Router } from 'express';
import productRouter from './product';
import orderRourer from './order';

const router = Router();

router.use('/product', productRouter);
router.use('/order', orderRourer);

export default router;
