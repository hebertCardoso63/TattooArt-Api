import { InternalMessage } from '../internal.error';

const usuariosErrors: Record<number, InternalMessage> = {
  101: {
    httpCode: 404,
    message: 'Usuário não encontrado',
  },
  102: {
    httpCode: 500,
    message: 'Ocorreu uma falha ao buscar o usuário',
  },
  103: {
    httpCode: 500,
    message: 'Ocorreu uma falha ao tentar excluir a conta',
  },
  104: {
    httpCode: 500,
    message: 'Ocorreu uma falha ao tentar atualizar a conta',
  },
};

export default usuariosErrors;
