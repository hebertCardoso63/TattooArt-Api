import { Router } from 'express';
import { agendamentoController } from '../controllers/agendamento.controller';
import { internalErrorsMiddleware } from '../middlewares/error.middleware';


const router = Router();

router
  .get(
    '/disponibilidade-tatuador/:tatuador_id',
    agendamentoController.listagemDisponibidadesTatuador,
    internalErrorsMiddleware,
  )
  .get(
    '/agendamentos-usuario',
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
  )
  .delete(
    '/agendamento-usuario/:agendamento_id',
    agendamentoController.cancelarAgendamento,
    internalErrorsMiddleware,
  )
  .get(
    '/agendamentos/',
    agendamentoController.listarAgendamentos,
    internalErrorsMiddleware,
  );
  ;

export default router;
