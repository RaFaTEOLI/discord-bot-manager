import CommandsController from '../controllers/CommandsController';
import { Router } from 'express';

const commandsController = new CommandsController();
const commandsRouter = Router();

commandsRouter.get('/', commandsController.index);
commandsRouter.get('/:id', commandsController.show);
commandsRouter.post('/', commandsController.store);

export default commandsRouter;
