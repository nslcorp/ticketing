import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400

  constructor(private errors: ValidationError[]) {
    super('[Custom] validation error');
    // Object.setPrototypeOf(this, RequestValidationError.prototype)
  }

  serialize(): { errors: { message: string; param?: string } } {
    const errors = this.errors.map(record => ({message: record.msg, param: record.param}))
    // @ts-ignore
    return {errors};
  }

  serializeErrors = () => this.errors.map(record => ({message: record.msg, param: record.param}))
}
