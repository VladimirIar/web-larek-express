import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import NotFoundError from '../errors/not-found-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const {
    email, phone, address, total, items,
  } = req.body;
  try {
    if (
      typeof email !== 'string'
    || typeof phone !== 'string'
    || typeof address !== 'string'
    || typeof total !== 'number'
    || !Array.isArray(items)
    || items.length === 0
    ) {
      return next(new BadRequestError('Некорректные данные заказа'));
    }
    const products = await Product.find({ _id: { $in: items } });
    if (products.length !== items.length) {
      return next(new NotFoundError('Некоторые товары не найдены'));
    }
    const unavalableProducts = products.filter((product) => product.price == null);
    if (unavalableProducts.length > 0) {
      return next(new BadRequestError('Некоторые товары недоступны'));
    }
    const calculatedTotal = products.reduce((sum, product) => sum + product.price!, 0);
    if (calculatedTotal !== total) {
      return next(new BadRequestError('Неверная сумма заказа'));
    }
    const orderId = faker.string.uuid();
    return res.status(200).send({
      id: orderId,
      total,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
