import { Router } from 'express';

const router = Router();

router.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there! ==> /api/users/currentuser');
});

export { router as currentUserRouter };
