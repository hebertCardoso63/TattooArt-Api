import { NextFunction, Request, Response } from 'express';
import { usuarioService } from '../services/usuario.service';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { AtualizaPerfilInput } from '../types/usuario/atualiza-perfil.interface';

class UsuarioController {
  public async getBuscarContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      const userId = request.params.id;

      const serviceResponse = await usuarioService.buscaContaUsuario(userId);

      return response.status(200).json(serviceResponse);
    } catch (error) {
      return next(error);
    }
  }

  public async deleteContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      // const { id: userId } = request?.usuario!;
      const userId = request.params.id;

      await usuarioService.excluiContaUsuario(userId);

      return response.status(204).send();
    } catch (error) {
      return next(error);
    }
  }

  public async patchContaUsuario(request: Request, response: Response, next: NextFunction) {
    try {
      const { body } = request;

      const senhaAtual= request.query?.senha! as string;
      const userId = request.params.id;
  
      if (senhaAtual &&!(await usuarioService.validarSenha(userId, senhaAtual))) {
        return response.status(401).json({ error: 'Senha inválida.' });
      }

      const hashedPassword = await hashPassword(body.senha);

      body.senha = hashedPassword;

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
