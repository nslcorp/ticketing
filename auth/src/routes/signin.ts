import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').notEmpty().withMessage("Password must exist")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if(!existingUser){
      throw new BadRequestError('Email in not exist');
    }

    const isPasswordValid = await Password.compare(existingUser.password, password)

    if(!isPasswordValid){
      throw new BadRequestError('Password is not valid');
    }

    res.status(200).send({id: existingUser.id, email: existingUser.email});






    // res.send('Hi there!');
});

export { router as signinRouter };
