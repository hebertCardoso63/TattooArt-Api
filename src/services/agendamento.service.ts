import knex from '../factories/knex.factory';
import {
  InputCriacaoAgendamento,
} from '../types/agendamentos/input-criacao-agendamento.interface';
import { HorarioDisponivel } from '../types/agendamentos/horario-disponivel.interface';
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
      .whereNull('data_cancelamento')
      .orderBy('data_criacao', 'desc');

    return tatuadores;
  }
  
  public async cancelarAgendamento(agendamentoId: string, usuarioId: string): Promise<void> {
    await knex('agendamentos')
      .where('id', agendamentoId)
      .andWhere('cliente_id', usuarioId)
      .update({ data_cancelamento: knex.fn.now() });
  }

  public async obterDisponibilidadeTatuador(tatuadorId: string, diaConsulta: string): Promise<string[]> {
    console.log(7878, diaConsulta);
    // Buscar todos os agendamentos para o tatuador e data especificados
    const agendamentos: AgendamentoModel[] = await knex('agendamentos')
      .select(['data_inicio'])
      .where('tatuador_id', tatuadorId)
      .andWhereRaw('date(data_inicio) = ?', [diaConsulta]);

    // Gerar todos os horários possíveis entre 08:00 e 18:00
    const horariosPossiveis: HorarioDisponivel[] = this.gerarHorariosPossiveis();

    // Extrair os horários ocupados dos agendamentos
    const horariosOcupados = agendamentos.map((agendamento) =>
      new Date(agendamento.data_inicio).toTimeString().substring(0, 5),
    );

    // Filtrar os horários disponíveis
    const horariosDisponiveis = horariosPossiveis.filter(
      (horario) => !horariosOcupados.includes(horario.hora),
    );

    const horariosDisponiveisFormatado = horariosDisponiveis.map((horario)=> horario.hora)

    return horariosDisponiveisFormatado;
  }

  private gerarHorariosPossiveis(): HorarioDisponivel[] {
    const horarios: HorarioDisponivel[] = [];
    for (let hora = 8; hora <= 17; hora++) {
      const horaString = hora.toString().padStart(2, '0') + ':00';
      horarios.push({ hora: horaString });
    }
    return horarios;
  }

  public async obterAgendamentos(): Promise<AgendamentoModel[]> {
    const agendamentos: AgendamentoModel[] = await knex('agendamentos')
      .select(['*'])
      .orderBy('data_criacao', 'desc');

    return agendamentos;
  }
}

export const agendamentoService = new AgendamentoService();
