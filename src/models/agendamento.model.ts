export interface AgendamentoModel {
    id: string;
    preco?: number;
    imagem?: string;
    tamanho?: number;
    cor?: string;
    estilo?: string;
    data_inicio: Date;
    data_criacao: Date;
    data_atualizacao: Date;
    data_exclusao: Date;
    cliente_id: string;
    tatuagem_id: string;
    agendamento_id: string;
    tatuador_id: string;
    criado_por: string;
  }