import { Router, Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

const router = Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Email and Password must be valid')
      // res.send(errors.array())

      // next()
      // throw error
      throw new RequestValidationError(errors.array())
    }

    throw new DatabaseConnectionError()

    res.send('Hi there! ==> /api/users/signup');
  });

export { router as signupUserRouter };
