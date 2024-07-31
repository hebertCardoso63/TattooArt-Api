import knex from "../factories/knex.factory";
import { DadosCadastrais, Usuario as UsuarioModel } from "../models/usuario.model";

class Usuario {
    private async verificarExistencia(nomeUsuario: string): Promise<boolean> {
        const usuario = await this.encontrarUsuario(nomeUsuario)
        
        if (!usuario) {
            return false;
        }

        return true;
    }
    public async encontrarUsuario(nomeUsuario: string): Promise<UsuarioModel | false> {
        const usuario: UsuarioModel = await knex('usuarios')
            .select(['*'])
            .where('nome', nomeUsuario)
            .first();

        if (!usuario) {
            return false;
        }

        return usuario;
    }

    public async cadastrar(dadosCadastrais: DadosCadastrais): Promise<number | false>{
        const existe = await this.verificarExistencia(dadosCadastrais.nome);

        if (existe) {
            return false;
        }

        const [idUsuario] = await knex('usuarios')
            .insert(dadosCadastrais, ['id']);

        return idUsuario.id;
    }
}

export const usuario = new Usuario();