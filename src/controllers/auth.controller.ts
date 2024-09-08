import { Request, Response, NextFunction } from 'express';
import { usuarioService } from '../services/usuario.service'
import { tatuadorService } from '../services/tatuador.service'
import { DadosCadastrais, UsuarioModel, PayloadToken } from '../models/usuario.model';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';


export async function validatePassword(req: Request, res: Response, next: NextFunction) {
    const usuarioId = req.usuario?.id;
    const senha: string = req.body.senha;

    if (!senha) {
        return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios' });
    }

    try {
        const senhaValida = await usuarioService.validarSenha(usuarioId!, senha);

        if (!senhaValida) {
            return res.status(401).json({ message: 'A senha não é válida'});
        }

        return res.status(200).send({ message: 'Senha válida'});
    } catch (error) {
        next(error);
    }
}

export async function register(req: Request, res: Response) {
    const dadosCadastrais: DadosCadastrais = req.body;

    try {
        const hashedPassword = await hashPassword(dadosCadastrais?.senha);

        dadosCadastrais.senha = hashedPassword;

        const idUsuario = await usuarioService.cadastrar(dadosCadastrais);

        if (!idUsuario) {
            return res.status(401).send('Já existe um usuário com alguma dessas credenciais');
        }

        return res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        console.log(666, error);
        return res.status(500).send('Erro ao registrar usuário');
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    const { nome_usuario, email, senha } = req.body;
  
    try {
      const user: false | UsuarioModel = await usuarioService.validaCredenciais(nome_usuario ?? email);
  
      if (!user || !(await comparePassword(senha, user.senha!))) {
        return res
          .status(401)
          .json({ mensagem: 'Credenciais inválidas', token: null });
      }
  
      let tatuadorDados = await tatuadorService.buscarPorUsuarioId(user.id);
  
      if (!tatuadorDados) {
        tatuadorDados = null;
      }
  
      const payload: PayloadToken = {
        id: user.id,
        nome_usuario: user.nome!,
        tatuador: tatuadorDados,
      };
  
      const token = generateToken(payload);
  
      return res
        .status(200)
        .json({ mensagem: 'Login realizado com sucesso', token });
    } catch (error) {
      return next(error);
    }
  }
