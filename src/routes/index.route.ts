import { Router } from 'express';

import auth from './auth.route';
import tatuador from './tatuador.route';
import { validateAuth } from '../validators/auth.validator'
import { authenticate } from '../middlewares/auth.middleware';


const router = Router();

router
    .use('/auth', validateAuth, auth)
    .use('/api', authenticate, tatuador)

export default router;
