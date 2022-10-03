import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

// type isCustomError = RequestValidationError | DatabaseConnectionError

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('[logger] Server error.', error)
  if(error instanceof CustomError){
    res.status(error.statusCode).send({errors: error.serializeErrors()})
  }
  res.status(400).send('Server:: unhandled error')
}
