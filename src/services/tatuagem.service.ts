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

    // public async deletar(idTatuador: string, idToken: string): Promise<TatuadorModel | false>{
    //     const tatuadorDeletado: TatuadorModel[] = await knex('tatuadores')
    //         .where('id', idTatuador)
    //         .andWhere('usuario_id', idToken)
    //         .update({ status: 'excluido', data_exclusao: knex.fn.now() }, ['*'])

    //     console.log(2323, tatuadorDeletado[0]);
    //     if (!tatuadorDeletado) {
    //         return false;
    //     }
        
    //     return tatuadorDeletado[0];
    // }

    // public async atualizarTatuador(idTatuador: string, novosDados: DadosCadastraisTatuador): Promise<TatuadorModel | false> {
    //     const tatuador: TatuadorModel = await knex('tatuadores')
    //         .where('id', idTatuador)
    //         .update(novosDados, ['*']);

    //     if (!tatuador) return false;

    //     return tatuador;
    // }

    // public async encontrarTatuador(nomeUsuario: string): Promise<TatuadorModel | false> {
    //     const usuario: TatuadorModel = await knex('tatuadores')
    //         .select(['*'])
    //         .where('nome', nomeUsuario)
    //         .first();

    //     if (!usuario) {
    //         return false;
    //     }

    //     return usuario;
    // }

    // public async buscarPorId(id: string): Promise<boolean | TatuadorModel> {
    //     const tatuador = await knex('tatuadores')
    //        .select(['*'])
    //        .where('id', id)
    //        .first();

    //     if (!tatuador) {
    //         return false;
    //     }

    //     return tatuador;
    // }
}

export const tatuagemService = new TatuagemService();