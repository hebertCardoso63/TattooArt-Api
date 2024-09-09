import knex from "../factories/knex.factory";
import { DadosCadastrais, UsuarioModel } from "../models/usuario.model";
import { InternalError } from '../errors/internal.error';
import { AtualizaPerfilInput } from '../types/usuario/atualiza-perfil.interface';
import { Usuario } from '../types/usuario/usuario.entity';
import { comparePassword } from '../utils/hash.util';

class UsuarioService {
  public async validaCredenciais(
    credencial: string,
  ): Promise<UsuarioModel | false> {
    const usuario: UsuarioModel = await knex('usuarios')
      .select(['*'])
      .where((qb) => {
        return qb.where('email', credencial).orWhere('nome', credencial);
      })
      .whereNull('data_exclusao')
      .first();

    if (!usuario) {
      return false;
    }

    return usuario;
  }

  public async validarSenha(usuarioId: string, senha: string): Promise<boolean> {
    const usuario = await knex('usuarios')
      .select(['*'])
      .where('id', usuarioId)
      .first();

    if (usuario && await comparePassword(senha, usuario.senha)) {
      return true;
    }
    
    return false;
  }

  private async verificarExistencia(dadosUsuario: DadosCadastrais): Promise<boolean> {
    const usuario = await this.encontrarUsuario(dadosUsuario)

    if (!usuario) {
      return false;
    }

    return true;
  }
  public async encontrarUsuario(dados: DadosCadastrais): Promise<UsuarioModel | false> {
    const query = knex('usuarios')
      .select(['*']);
  
    console.log(4545, dados);

    if (dados.nome) {
      query.orWhere('nome', dados.nome);
    }
    if (dados.cpf) {
      query.orWhere('cpf', dados.cpf);
    }
    if (dados.rg) {
      query.orWhere('rg', dados.rg);
    }
    if (dados.email) {
      query.orWhere('email', dados.email);
    }
    if (dados.telefone_celular) {
      query.orWhere('telefone_celular', dados.telefone_celular);
    }
  
    const usuario: UsuarioModel = await query.first();
    console.log(9090, usuario);
    if (!usuario) {
      return false;
    }
  
    return usuario;
  }
  

  public async cadastrar(dadosCadastrais: DadosCadastrais): Promise<number | false> {
    const existe = await this.verificarExistencia(dadosCadastrais);

    if (existe) {
      return false;
    }

    const [idUsuario] = await knex('usuarios')
      .insert(dadosCadastrais, ['id']);

    return idUsuario.id;
  }

  public async buscaContaUsuario(userId: string): Promise<Usuario> {
    const response = await knex({ u: 'usuarios' })
      .select(
        'u.nome',
        'u.nome_completo',
        'u.email',
        'u.cpf',
        'u.rg',
        'endereco',
        'telefone_celular',
        'data_criacao',
      )
      .where('id', userId)
      .whereNull('data_exclusao')
      .first()
      .catch((e) => {
        throw new InternalError(102, e.message);
      });

    if (!response) {
      throw new InternalError(101);
    }

    return response;
  }

  public async excluiContaUsuario(userId: string): Promise<void> {
    await knex({ u: 'usuarios' })
      .update({ data_exclusao: knex.fn.now(), nome: null })
      .where('id', userId)
      .whereNull('data_exclusao')
      .catch((e) => {
        throw new InternalError(103, e.message);
      });
  }

  public async atualizaContaUsuario(
    userId: string, 
    input: AtualizaPerfilInput,
  ): Promise<Usuario> {
    const query = knex({ u: 'usuarios' })
      .update({
        ...input,
        data_atualizacao: knex.fn.now(),
      })
      .returning([
        'u.nome',
        'u.email',
        'u.cpf',
        'u.telefone_celular',
        'u.rg',
        'u.endereco',
        'u.data_criacao',
      ])
      .where('id', userId)
      .whereNull('data_exclusao');

    return query
      .then((response) => response[0])
      .catch((e) => {
        throw new InternalError(104, e.message);
      });
  }
}

export const usuarioService = new UsuarioService();