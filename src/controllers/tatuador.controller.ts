import { Request, Response, NextFunction } from "express";
import { tatuador } from "../services/tatuador.service";
import { DadosCadastraisTatuador, Tatuador } from "../models/tatuador.model";


class ControllerTatuador {
    constructor() {
        this.editarTatuador = this.editarTatuador.bind(this);
        this.buscarTatuador = this.buscarTatuador.bind(this);
        this.cadastrarTatuador = this.cadastrarTatuador.bind(this);
        this.listarTatuadores = this.listarTatuadores.bind(this);
        this.deletarTatuador = this.deletarTatuador.bind(this);
    }
    public async deletarTatuador(req: Request, res: Response) {
        const idTatuador = req.params.id;
        const idToken = req.usuario?.id;

        const success = await tatuador.deletar(idTatuador, idToken!);

        if (!success) return res.status(400).send('Tatuador não encontrado')

        return res.status(200).json({ mensagem: 'Tatuador deletado', dados: success })
    }

    public async listarTatuadores(req: Request, res: Response) {
        const lista = await tatuador.buscar();

        if (lista.length === 0) return res.status(200).send([]);

        return res.status(200).json(lista);
    }

    public async editarTatuador(req: Request, res: Response) {
        const {
            body: novosDados,
            params: { id },
        } = req as unknown as { body: DadosCadastraisTatuador; params: { id: string } };
        
        if (!id) return res.status(400).json({ message: "ID do tatuador não fornecido" });

        const tatuadorBuscado = await tatuador.atualizarTatuador(id, novosDados);

        if (!tatuadorBuscado) return res.status(404).json({ message: "Tatuador não encontrado" });

        return res.status(200).json(tatuadorBuscado);
    }

    public async buscarTatuador(req: Request, res: Response, next: NextFunction) {
        if (!req.params.id) return res.status(400).json({ message: "ID do tatuador não fornecido" });

        const tatuadorBuscado = await tatuador.buscarPorId(req.params.id);

        if (!tatuadorBuscado) return res.status(404).json({ message: "Tatuador não encontrado" });

        return res.status(200).json(tatuadorBuscado);
    }

    public async cadastrarTatuador(req: Request, res: Response, next: NextFunction) {
        if (!req.usuario) return res.status(401).json({ message: "Unauthorized" });

        const usuario = req.usuario;

        const dadosTatuador: DadosCadastraisTatuador = {
            usuario_id: usuario.id,
            nome: req.body.nome,
            experiencia: req.body.experiencia,
            status: req.body.status,
            tipo: req.body.tipo,
            imagem_perfil: req.body.imagem_perfil,
        };

        try {
            const idRegistro = await tatuador.cadastrar(dadosTatuador);

            return res.status(201).json({ message: 'Tatuador criado com sucesso', id_registro: idRegistro });
        } catch (err) {
            return res.status(500).send('Erro ao cadastrar tatuador');
        }
    }
}

export const controllerTatuador = new ControllerTatuador();
