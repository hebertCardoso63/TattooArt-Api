import { UUID } from "crypto";
export interface Tatuador {
    id: UUID;
    experiencia: number;
    nome?: string;
    status?: string;
    tipo?: string;
    redes_sociais?: Record<string, string>;
    usuario_id: string;
    estudio_id?: string;
    imagem_perfil: string;
    estilo_tatuagem?: string[];
    imagem_capa?: string;
    data_criacao?: Date;
    data_atualizacao?: Date;
    endereco_atendimento: string;
}

export interface DadosCadastraisTatuador {
    usuario_id: UUID;
    nome: string;
    experiencia: number;
    status: string;
    tipo: string;
    imagem_perfil?: string;
    imagem_capa?: string;
    estudio_id?: string;
    estilo_tatuagem?: string[];
    redes_sociais?: Record<string, string>;
    endereco_atendimento: string;
}
