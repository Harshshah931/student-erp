import { Router } from 'express';
import { login, register, logout, seedUsers } from '../controllers/auth.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);
router.post('/seed', seedUsers);

export default router;