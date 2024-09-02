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
    '/agendamentos-usuario',
    agendamentoController.listarAgendamentoUsuario,
    internalErrorsMiddleware,
  )
  .post(
    '/agendamento-usuario',
    agendamentoController.criarAgendamentoUsuario,
    internalErrorsMiddleware,
  )
  .delete(
    '/agendamento-usuario/:agendamento_id',
    agendamentoController.cancelarAgendamento,
    internalErrorsMiddleware,
  );

export default router;
