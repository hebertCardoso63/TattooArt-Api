import knex from '../factories/knex.factory';
import {
  InputCriacaoAgendamento,
} from '../types/agendamentos/input-criacao-agendamento.interface';
import { AgendamentoModel } from '../models/agendamento.model';

class AgendamentoService {
  public async criarAgendamentoUsuario(
    dadosCadastrais: InputCriacaoAgendamento,
  ): Promise<string> {

    const [agendamento] = await knex('agendamentos').insert(dadosCadastrais, [
      'id',
    ]);

    return agendamento.id;
  }

  public async obterAgendamentosUsuario(usuarioId: string): Promise<AgendamentoModel[]> {
    const tatuadores: AgendamentoModel[] = await knex('agendamentos')
      .select(['*'])
      .where('cliente_id', usuarioId)
      .orderBy('data_criacao', 'desc');

    return tatuadores;
  }
}

export const agendamentoService = new AgendamentoService();
