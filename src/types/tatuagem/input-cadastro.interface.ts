import { UUID } from "crypto";

export interface inputCadastroTatuagem {
    criado_por: UUID;
    imagem: string;
    preco?: number;
    tamanho?: number;
    cor?: string;
    estilo?: string;
    cliente_id?: UUID;
    agendamento_id?: UUID;
    tatuador_id?: UUID;
}