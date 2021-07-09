import { Router } from 'express';
import MusicController from '../controllers/MusicController';

const musicController = new MusicController();
const musicRouter = Router();

musicRouter.get('/queue', musicController.getQueue);
musicRouter.get('/', musicController.getSong);

export default musicRouter;
