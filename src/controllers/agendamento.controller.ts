import { Request, Response, NextFunction } from 'express';
import { agendamentoService } from '../services/agendamento.service';
import { InputCriacaoAgendamento } from '../types/agendamentos/input-criacao-agendamento.interface';

class AgendamentoController {
  constructor() {
    this.criarAgendamentoUsuario = this.criarAgendamentoUsuario.bind(this);
    this.listarAgendamentoTatuador = this.listarAgendamentoTatuador.bind(this);
    this.listarAgendamentoUsuario = this.listarAgendamentoUsuario.bind(this)
    this.cancelarAgendamento = this.cancelarAgendamento.bind(this);
  }

  public async cancelarAgendamento(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const usuario = req.usuario;
    const agendamentoId = req.params.agendamento_id;

    try {
      await agendamentoService.cancelarAgendamento(agendamentoId, usuario?.id!);

      return res.status(204).json();
    } catch (error) {
      next(error);
    }
  }

  public async listarAgendamentoUsuario(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    
    const usuario = req.usuario?.id!

    try {
      const lista = await agendamentoService.obterAgendamentosUsuario(usuario);

      if (lista.length === 0) return res.status(200).send([]);

      return res.status(200).json(lista);
    } catch (error) {
      next(error);
    }
  }

  public async listarAgendamentoTatuador(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const tatuador = req.params.id;

    try {
      const lista = await agendamentoService.obterAgendamentosTatuador(tatuador);

      if (lista.length === 0) return res.status(200).send([]);

      return res.status(200).json(lista);
    } catch (error) {
      next(error);
    }
  }

  public async criarAgendamentoUsuario(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {

      const dadosAgendamento: InputCriacaoAgendamento = {
        ...req.body,
        cliente_id: req.usuario?.id!,
      };

      const idRegistro = await agendamentoService.criarAgendamentoUsuario(dadosAgendamento);

      return res.status(201).json({
        message: 'Agendamento concluido com sucesso',
        id_registro: idRegistro,
      });
    } catch (error) {
      next(error);
    }
  }

  public async listagemDisponibidadesTatuador(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const tatuadorId = req.params.tatuador_id;
    const diaConsulta = req.query.dia_consulta as string;

    try {
      const agendamentosPossiveis = await agendamentoService.obterDisponibilidadeTatuador(tatuadorId, diaConsulta);

      return res.status(200).json(agendamentosPossiveis);
    } catch (error) {
      next(error);
    }
  }

  public async listarAgendamentos(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const agendamentos = await agendamentoService.obterAgendamentos();

      return res.status(200).json(agendamentos);
    } catch (error) {
      next(error);
    }
  }
}

export const agendamentoController = new AgendamentoController();
