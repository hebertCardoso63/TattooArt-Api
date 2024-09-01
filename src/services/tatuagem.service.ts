import knex from "../factories/knex.factory";
import { TatuagemModel } from "../models/tatuagem.model";
import { inputCadastroTatuagem } from "../types/tatuagem/input-cadastro.interface";
import { attachPaginate } from 'knex-paginate';
import { IPaginateParams, IPagination, IWithPagination } from "knex-paginate";
import { UUID } from "crypto";

attachPaginate();
class TatuagemService {
    public async cadastrar(dadosCriacaoTatuagem: inputCadastroTatuagem): Promise<number | false>{
        const [ dadosTatuagem ] = await knex('tatuagens')
            .insert(dadosCriacaoTatuagem, ['id']);

        return dadosTatuagem.id;
    }

    public async buscar(usuarioId?: UUID, tatuadorId?: UUID, filtro?: IPaginateParams): Promise<IWithPagination<TatuagemModel> | TatuagemModel[]> {
        console.log(66, usuarioId, tatuadorId, filtro);
        const tatuagens = await knex('tatuagens')
           .select(['*'])
           .whereNull('data_exclusao')
           .orderBy('data_criacao', 'desc');

        // if (usuarioId) {
        //     tatuagens.where('criado_por', usuarioId);
        // }
        
        // if (tatuadorId) {
        //     tatuagens.where('criado_por', tatuadorId);
        // }

        // if (filtro) {
        //     return tatuagens.paginate(filtro);
        // }

        // console.log(88, (await tatuagens).toString());
        return tatuagens;
    }

    public async excluirTatuagem(tatuagemId: string, idToken: string): Promise<TatuagemModel | false>{
        const tatuagemExcluida: TatuagemModel[] = await knex('tatuagens')
            .where('id', tatuagemId)
            .andWhere('usuario_id', idToken)
            .update({ status: 'excluido', data_exclusao: knex.fn.now() }, ['*'])

        console.log(2323, tatuagemExcluida[0]);
        if (!tatuagemExcluida) {
            return false;
        }
        
        return tatuagemExcluida[0];
    }

    public async editarTatuagem(tatuagemId: string, novosDados: inputCadastroTatuagem): Promise<TatuagemModel | false> {
        const tatuador: TatuagemModel = await knex('tatuagens')
            .where('id', tatuagemId)
            .update(novosDados, ['*']);

        if (!tatuador) return false;

        return tatuador;
    }

    public async getByIdTatuagem(id: string): Promise<boolean | TatuagemModel> {
        const tatuador = await knex('tatuagens')
           .select(['*'])
           .where('id', id)
           .first();

        if (!tatuador) {
            return false;
        }

        return tatuador;
    }
}

export const tatuagemService = new TatuagemService();