import { InternalMessage } from '../internal.error';

const authErrors: Record<number, InternalMessage> = {
  1: {
    httpCode: 400,
    message: 'Credenciais não informadas',
  },
  2: {
    httpCode: 401,
    message: 'Credenciais inválidas',
  },
};

export default authErrors;
