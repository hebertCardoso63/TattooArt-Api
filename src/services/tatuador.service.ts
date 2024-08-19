import knex from "../factories/knex.factory";
import { 
    DadosCadastraisTatuador,
    Tatuador as TatuadorModel,
} from "../models/tatuador.model";

class TatuadorService {
    private async verificarExistencia(nomeUsuario: string): Promise<boolean> {
        const usuario = await this.encontrarTatuador(nomeUsuario)
        
        if (!usuario) {
            return false;
        }

        return true;
    }

    public async deletar(idTatuador: string, idToken: string): Promise<TatuadorModel | false>{
        const tatuadorDeletado: TatuadorModel[] = await knex('tatuadores')
            .where('id', idTatuador)
            .andWhere('usuario_id', idToken)
            .update({ status: 'excluido', data_exclusao: knex.fn.now() }, ['*'])

        console.log(2323, tatuadorDeletado[0]);
        if (!tatuadorDeletado) {
            return false;
        }
        
        return tatuadorDeletado[0];
    }

    public async buscar(): Promise<TatuadorModel[]> {
        const tatuadores: TatuadorModel[] = await knex('tatuadores')
           .select(['*'])
           .whereNull('data_exclusao')
           .orderBy('data_criacao', 'desc');

        return tatuadores;
    }

    public async atualizarTatuador(idTatuador: string, novosDados: DadosCadastraisTatuador): Promise<TatuadorModel | false> {
        const tatuador: TatuadorModel = await knex('tatuadores')
            .where('id', idTatuador)
            .update(novosDados, ['*']);

        if (!tatuador) return false;

        return tatuador;
    }

    public async encontrarTatuador(nomeUsuario: string): Promise<TatuadorModel | false> {
        const usuario: TatuadorModel = await knex('tatuadores')
            .select(['*'])
            .where('nome', nomeUsuario)
            .first();

        if (!usuario) {
            return false;
        }

        return usuario;
    }

    public async buscarPorUsuarioId(id: string): Promise<null | TatuadorModel> {
        const tatuador = await knex('tatuadores')
           .select(['*'])
           .where('usuario_id', id)
           .first();

        if (!tatuador) {
            return null;
        }

        return tatuador;
    }

    public async buscarPorId(id: string): Promise<null | TatuadorModel> {
        const tatuador = await knex('tatuadores')
           .select(['*'])
           .where('id', id)
           .first();

        if (!tatuador) {
            return null;
        }

        return tatuador;
    }

    public async cadastrar(dadosCadastrais: DadosCadastraisTatuador): Promise<number | false>{
        const existe = await this.verificarExistencia(dadosCadastrais.nome);

        if (existe) {
            return false;
        }

        const [ idUsuario ] = await knex('tatuadores')
            .insert(dadosCadastrais, ['id']);

        return idUsuario.id;
    }
}

export const tatuadorService = new TatuadorService();