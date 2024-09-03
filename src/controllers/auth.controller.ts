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
    const { nome_usuario, senha } = req.body;

    if (!nome_usuario || !senha) {
        return res.status(400).send('Nome de usuário e senha são obrigatórios');
    }

    try {
        const hashedPassword = await hashPassword(senha);
        
        const dadosCadastrais: DadosCadastrais = {
            nome: nome_usuario,
            senha: hashedPassword,
        }

        const idUsuario = await usuarioService.cadastrar(dadosCadastrais);

        if (!idUsuario) {
            return res.status(401).send('Nome de usuário já existe');
        }

        return res.status(201).send('Usuário registrado com sucesso');
    } catch (error) {
        return res.status(500).send('Erro ao registrar usuário');
    }
}

export async function login(req: Request, res: Response) {
    const { nome_usuario, senha } = req.body;

    if (!nome_usuario || !senha) {
        return res.status(400).send('Nome de usuário e senha são obrigatórios');
    }

    try {
        const user: false | UsuarioModel = await usuarioService.encontrarUsuario(nome_usuario);

        if (!user || !(await comparePassword(senha, user.senha))) {
            return res.status(401).json({ mensagem: 'Credenciais inválidas', token: null });
        }

        console.log(4545, user.id);

        let tatuadorDados = await tatuadorService.buscarPorUsuarioId(user.id);

        if (!tatuadorDados) {
            tatuadorDados = null;
        }
        
        const payload: PayloadToken = {
            id: user.id,
            nome_usuario: user.nome,
            tatuador: tatuadorDados,
        }

        const token = generateToken(payload);

        return res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (error) {
        return res.status(500).send('Erro ao fazer login');
    }
}
