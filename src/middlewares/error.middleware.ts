import { NextFunction, Request, Response } from 'express';
import { InternalError } from '../errors/internal.error';

export const internalErrorsMiddleware = async (err: any, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof InternalError) {

    return response.status(err.httpCode).json(err);

  } else if (err instanceof Error) {
    
    return response.status(500).json(new InternalError(0, err.message));
  
  }

  return response.status(500).json(new InternalError(-1, JSON.stringify(err)));
};
