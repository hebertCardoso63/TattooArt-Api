import { Router } from 'express';

import auth from './auth.route';
import tatuador from './tatuador.route';
import usuario from './usuario.route';
import tatuagem from './tatuagem.route'
import agendamento from './agendamento.route'
import { authenticate } from '../middlewares/auth.middleware';


const router = Router();

router
    .use('/auth', auth)
    .use('/api', authenticate, tatuador)
    .use('/api', authenticate, usuario)
    .use('/api', authenticate, tatuagem)
    .use('/api', authenticate, agendamento);

export default router;
