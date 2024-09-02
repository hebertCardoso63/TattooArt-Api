import { Request, Response, NextFunction } from 'express';
import { agendamentoService } from '../services/agendamento.service';
import { InputCriacaoAgendamento } from '../types/agendamentos/input-criacao-agendamento.interface';

class AgendamentoController {
  constructor() {
    this.criarAgendamentoUsuario = this.criarAgendamentoUsuario.bind(this);
    this.listarAgendamentoUsuario = this.listarAgendamentoUsuario.bind(this);
    this.listarAgendamentoTatuador = this.listarAgendamentoTatuador.bind(this);
  }

  public async listarAgendamentoUsuario(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    // const usuario = req.usuario;
    const usuario = req.params.id;

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

      const { cliente_id, ...resto } = req.body;

      const dadosAgendamento: InputCriacaoAgendamento = {
        ...resto,
        cliente_id,
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
}

export const agendamentoController = new AgendamentoController();
