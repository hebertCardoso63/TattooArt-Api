import { NextFunction, Request, Response } from 'express';
import { atualizarPerfilUsuarioSchema } from './schemas/usuario.schema';

export const validateUsuariosAtualizarPerfil = (request: Request, response: Response, next: NextFunction) => {
  const { error } = atualizarPerfilUsuarioSchema.validate(request.body);

  if (error) {
    return response.status(400).json({ error: error.details[0].message });
  }

  next();
};
