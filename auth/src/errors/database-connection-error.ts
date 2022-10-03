import { CustomError } from './custom-error';


export class DatabaseConnectionError extends CustomError {
  statusCode = 500

  constructor() {
    super();
    // Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }


  serializeErrors = () => [{message: 'Database connection error'}]


}
