import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalError';
import getNotFound from './app/middlewares/notFound';
import router from './app/routes';

//parser..
app.use(express.json());
app.use(cors());

app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  Promise.reject();
  // const a = 10;
  // res.send(a);
};

app.get('/', test);

app.use(globalErrorHandler);

app.use(getNotFound);

export default app;
