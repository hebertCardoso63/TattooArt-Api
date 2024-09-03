import { Router } from 'express';
import { register, login, validatePassword } from '../controllers/auth.controller';
import { validateAuth } from '../validators/auth.validator'
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router
    .post('/validate-password', authenticate, validatePassword)
    .post('/register', validateAuth, register)
    .post('/login', validateAuth, login);

export default router;