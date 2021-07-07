import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (request: Request, response: Response) => {
  return response.send({ message: 'Hello World' });
});

app.listen(3333, () => {
  console.log('✅  Server running on port 3333...');
});
