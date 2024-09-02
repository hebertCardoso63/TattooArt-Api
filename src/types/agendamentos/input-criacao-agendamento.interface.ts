
export interface InputCriacaoAgendamento {
    tatuador_id: string; // ID do tatuador com quem o cliente está agendando
    tatuagem_id?: string; // ID do tatuagem com
    servico_id?: string; // ID do serviço que será realizado
    estudio_id?: string; // ID do estúdio, caso seja necessário
    data_inicio: Date; // Data e hora de início do agendamento
    duracao: number; // Duração do serviço em minutos
    observacao?: string; // Qualquer observação adicional fornecida pelo cliente
  }
  