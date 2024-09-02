import { Router } from 'express';
import { agendamentoController } from '../controllers/agendamento.controller';
import {
  validateTatuadorCadastro,
  validateBuscarTatuador,
} from '../validators/tatuador.validator';
import { internalErrorsMiddleware } from '../middlewares/error.middleware';


const router = Router();

router
  .get(
    '/agendamentos-usuario/:id',
    agendamentoController.listarAgendamentoUsuario,
    internalErrorsMiddleware,
  )
  .get(
    '/agendamentos-tatuador/:id',
    agendamentoController.listarAgendamentoTatuador,
    internalErrorsMiddleware,
  )
  .post(
    '/agendamento-usuario',
    agendamentoController.criarAgendamentoUsuario,
    internalErrorsMiddleware,
  );

export default router;
