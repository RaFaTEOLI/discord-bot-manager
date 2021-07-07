import BotController from '../controllers/BotController';
import { Router } from 'express';

const botController = new BotController();
const botRouter = Router();

botRouter.get('/', botController.index);
botRouter.get('/:id', botController.show);

export default botRouter;
