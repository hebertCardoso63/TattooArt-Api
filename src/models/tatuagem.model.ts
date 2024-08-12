import { UUID } from "crypto";

export interface TatuagemModel {
    id: UUID;
    imagem: string;
    preco?: number;
    tamanho?: number;
    cor?: string;
    estilo?: string;
    data_criacao?: Date;
    data_atualizacao?: Date;
    data_exclusao?: Date;
    cliente_id?: UUID;
    agendamento_id?: UUID;
    tatuador_id?: UUID;
    criado_por?: UUID;
}
