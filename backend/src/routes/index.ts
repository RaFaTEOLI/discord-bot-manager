import { Router } from 'express';

import commandsRouter from './commands.routes';
import botRouter from './bot.routes';
import typesRouter from './types.routes';

const routes = Router();

routes.use('/commands', commandsRouter);
routes.use('/bot', botRouter);
routes.use('/types', typesRouter);

export default routes;
