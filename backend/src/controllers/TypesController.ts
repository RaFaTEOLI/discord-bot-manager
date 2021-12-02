import { Request, Response } from 'express';
import TypesRepository from '../repository/Firebase/TypesRepository';

class TypesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const typesRepository = new TypesRepository();
    return response.json(await typesRepository.all());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const typesRepository = new TypesRepository();
    const data = await typesRepository.findById(id);
    return response.json(data);
  }
}

export default TypesController;
