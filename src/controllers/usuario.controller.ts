import { NextFunction, Request, Response } from 'express';
import { usuarioService } from '../services/usuario.service';
import { AtualizaPerfilInput } from '../types/usuario/atualiza-perfil.interface';

class UsuarioController {
  public async getBuscarContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: userId } = request?.usuario!;

      const serviceResponse = await usuarioService.buscaContaUsuario(userId);

      return response.status(200).json(serviceResponse);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      const { id: userId } = request?.usuario!;

      await usuarioService.excluiContaUsuario(userId);

      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  public async patchContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      const { body, usuario } = request;

      const { id: userId } = usuario!;
      const input: AtualizaPerfilInput = body as AtualizaPerfilInput;

      const serviceResponse = await usuarioService.atualizaContaUsuario(userId, input);

      if (!serviceResponse) {
        return response.status(204).json();
      }

      return response.status(200).json(serviceResponse);
    } catch (error) {
      return next(error);
    }
  }
}

export const usuarioController = new UsuarioController();
