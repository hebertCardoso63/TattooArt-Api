import { UsuarioModel } from '../../models/usuario.model';

export interface Usuario
  extends Omit<
    UsuarioModel,
    'id' | 'data_atualizacao' | 'data_exclusao' | 'senha' | 'status'
  > {
  // Sobrescrevendo o model e definindo esses campos como obrigatórios
  nome: string;
  email: string;
  cpf: string;
}
