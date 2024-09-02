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
      .whereNull('data_cancelamento')
      .orderBy('data_criacao', 'desc');

    return tatuadores;
  }

  public async obterAgendamentosTatuador(tatuadorId: string): Promise<AgendamentoModel[]> {
    const tatuadores: AgendamentoModel[] = await knex('agendamentos')
      .select(['*'])
      .where('tatuador_id', tatuadorId)
      .orderBy('data_criacao', 'desc');

    return tatuadores;
  }
  
  public async cancelarAgendamento(agendamentoId: string, usuarioId: string): Promise<void> {
    await knex('agendamentos')
      .where('id', agendamentoId)
      .andWhere('cliente_id', usuarioId)
      .update({ data_cancelamento: knex.fn.now() });
  }
}

export const agendamentoService = new AgendamentoService();
