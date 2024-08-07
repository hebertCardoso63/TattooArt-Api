export interface Tatuador {
    id: string;
    experiencia: number;
    status?: string;
    tipo?: string;
    redes_sociais?: Record<string, string>;
    data_criacao?: Date;
    data_atualizacao?: Date;
    usuario_id: string;
    estudio_id?: string;
    imagem_perfil: string;
    nome?: string;
    estilo_tatuagem?: string[];
    imagem_capa?: string;
}

export interface DadosCadastraisTatuador {
    usuario_id: string;
    nome: string;
    experiencia: number;
    status: string;
    tipo: string;
    imagem_perfil?: string;
    imagem_capa?: string;
    estudio_id?: string;
    estilo_tatuagem?: string[];
    redes_sociais?: Record<string, string>;
}
