import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { studentRouter } from './app/modules/student/student.route';

//parser..
app.use(express.json());
app.use(cors());

app.use('/api/v1/students', studentRouter);
app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

export default app;
