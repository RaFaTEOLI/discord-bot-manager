import TestController from '../controllers/TestController';
import { Router } from 'express';

const testController = new TestController();
const testRouter = Router();

testRouter.get('/', testController.index);
testRouter.post('/', testController.store);
testRouter.put('/:id', testController.update);
testRouter.get('/:id', testController.show);
testRouter.delete('/:id', testController.destroy);

export default testRouter;
