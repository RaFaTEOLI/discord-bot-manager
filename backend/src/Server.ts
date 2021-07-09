import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (request: Request, response: Response) => {
  if (request.query.code) {
    return response.send({ code: request.query.code });
  }
  return response.send({ message: 'Hello World' });
});

app.listen(process.env.PORT, () => {
  console.log(`✅  Server running on port ${process.env.PORT}...`);
});
