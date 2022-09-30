import { Router } from 'express';

const router = Router();

router.get('/api/users/signin', (req, res) => {
  res.send('Hi there! ==> /api/users/signin');
});

export { router as signinUserRouter };
