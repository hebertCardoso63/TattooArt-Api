import { UUID } from "crypto";
import { Tatuador } from './tatuador.model'

export interface PayloadToken {
    id: UUID;
    nome_usuario: string;
    tatuador: Tatuador | null;
}

export interface DadosCadastrais {
    nome: string;
    senha: string;
}

export interface UsuarioModel {
    id: UUID;
    nome: string;
    senha: string;
    telefone_celular?: string;
    cpf?: string;
    rg?: string;
    status?: string;
    endereco?: string;
    data_criacao?: Date;
    data_atualizacao?: Date;
    data_exclusao?: Date;
    email?: string;
  }