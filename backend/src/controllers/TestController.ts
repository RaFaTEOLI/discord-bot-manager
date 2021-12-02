import { Request, Response } from 'express';
import TestRepository from '../repository/Firebase/TestRepository';

class TestController {
  public async index(request: Request, response: Response): Promise<Response> {
    const testRepository = new TestRepository();
    return response.json(await testRepository.all());
  }

  public async store(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;
      const testRepository = new TestRepository();
      return response
        .status(204)
        .json(await testRepository.store({ name, description }));
    } catch (err: any) {
      return response.status(500).json(err.message);
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const testRepository = new TestRepository();
    const { id } = request.params;
    return response
      .status(204)
      .json(await testRepository.update(id, { name, description }));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const testRepository = new TestRepository();
    const data = await testRepository.findById(id);
    return response.json(data);
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;
    const testRepository = new TestRepository();
    const data = await testRepository.destroy(id);
    return response.status(204).json(data);
  }
}

export default TestController;
