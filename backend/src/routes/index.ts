import { Router } from 'express';

import commandsRouter from './commands.routes';
import botRouter from './bot.routes';
import typesRouter from './types.routes';
import musicRouter from './music.routes';
import queueRouter from './queue.routes';
import testRouter from './test.routes';

const routes = Router();

routes.use('/commands', commandsRouter);
routes.use('/bot', botRouter);
routes.use('/types', typesRouter);
routes.use('/music', musicRouter);
routes.use('/queue', queueRouter);
routes.use('/test', testRouter);

export default routes;
