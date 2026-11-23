import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';
import router from './routes/index';
import NotFoundError from './errors/not-found-error';
import errorHadler from './middlewares/error-handler';
import { errorLogger, reqestLogger } from './middlewares/logger';
import { PORT, DATABASE_URL } from './config';

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(reqestLogger);
app.use('/', router);
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Запрашиваемый маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHadler);
mongoose.connect(DATABASE_URL).then(() => {
  app.listen(+PORT, () => { console.log(`арр listening on port http://localhost:${PORT}/`); });
})
  .catch((error) => {
    console.log('MongoDB connection error: ', error);
    process.exit(1);
  });
