import { PayloadToken } from '../../src/models/usuario.model';

declare module 'express-serve-static-core' {
  interface Request {
      usuario?: PayloadToken
  }
}