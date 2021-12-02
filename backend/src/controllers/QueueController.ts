import { Request, Response } from 'express';
import QueueRepository from '../repository/Firebase/QueueRepository';
require('dotenv').config();

class QueueController {
  public async index(request: Request, response: Response): Promise<Response> {
    const queueRepository = new QueueRepository();
    const queues = await queueRepository.all();
    return response.json(queues);
  }
}

export default QueueController;
