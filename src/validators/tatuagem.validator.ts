import { NextFunction, Request, Response } from 'express';
import { cadastrarTatuagemSchema } from './schemas/tatuagem.schema';

export const validateCadastroTatuagem = (request: Request, response: Response, next: NextFunction) => {
  const { error } = cadastrarTatuagemSchema.validate(request.body);

  if (error) {
    return response.status(400).json({ error: error.details[0].message });
  }

  next();
};
