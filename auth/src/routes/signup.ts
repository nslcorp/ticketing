import { Router } from 'express';

const router = Router();

router.get('/api/users/signup', (req, res) => {
  res.send('Hi there! ==> /api/users/signup');
});

export { router as signupUserRouter };
