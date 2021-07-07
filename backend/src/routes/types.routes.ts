import TypesController from '../controllers/TypesController';
import { Router } from 'express';

const typesController = new TypesController();
const typesRouter = Router();

typesRouter.get('/', typesController.index);
typesRouter.get('/:id', typesController.show);

export default typesRouter;
