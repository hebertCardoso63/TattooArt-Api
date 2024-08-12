import authErrors from './error-mapping/0-auth.errors';
import usuariosErrors from './error-mapping/100-usuarios.errors';

export type InternalMessage = {
  httpCode: number;
  message: string;
};

export class InternalError {
  httpCode: number;
  mensagem: string;

  constructor(
    private code: number,
    private readonly detalhes?: string,
  ) {
    const handling = this.errorHandler();

    this.httpCode = handling.httpCode;
    this.mensagem = handling.message;
  }

  private errorHandler(): InternalMessage {
    if (this.code === 0) {
      return {
        httpCode: 500,
        message: 'Um erro inesperado ocorreu',
      };
    } else if (this.code < 100) {
      return authErrors[this.code];
    } else if (this.code < 200) {
      return usuariosErrors[this.code];
    }

    this.code = -1;
    return {
      httpCode: 500,
      message: 'Um erro não mapeado ocorreu',
    };
  }
}
