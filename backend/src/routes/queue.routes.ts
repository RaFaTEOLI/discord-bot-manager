import QueueController from '../controllers/QueueController';
import { Router } from 'express';

const queueController = new QueueController();
const queueRouter = Router();

queueRouter.get('/', queueController.index);

export default queueRouter;
