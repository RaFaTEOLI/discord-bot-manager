import { Request, Response } from 'express';
import TypesRepository from '../repository/TypesRepository';
import types from '../db/types.json';

class TypesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const typesRepository = new TypesRepository(types);
    return response.json(await typesRepository.all());
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const typesRepository = new TypesRepository(types);
    const data = await typesRepository.findById(id);
    return response.json(data);
  }
}

export default TypesController;
