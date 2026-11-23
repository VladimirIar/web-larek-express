import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHadler = (
  err: MongooseError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof BadRequestError) {
    return res.status(400).send({ message: err.message });
  }
  if (err instanceof ConflictError) {
    return res.status(409).send({ message: err.message });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).send({ message: err.message });
  }
  return res.status(500).send({ message: 'Внутренняя ошибка сервера' });
};

export default errorHadler;
