import { Request, Response, NextFunction } from "express";
import { tatuagemService } from "../services/tatuagem.service";
import { DadosCadastraisTatuador } from "../models/tatuador.model";
import { inputCadastroTatuagem } from "../types/tatuagem/input-cadastro.interface";


class TatuagemController {
    constructor() {
        this.cadastrarTatuagem = this.cadastrarTatuagem.bind(this);
        // this.listarTatuagens = this.listarTatuagens.bind(this);
        // this.editarTatuagem = this.editarTatuagem.bind(this);
        // this.buscarTatuagem = this.buscarTatuagem.bind(this);
        // this.deletarTatuagem = this.deletarTatuagem.bind(this);
    }

    public async cadastrarTatuagem(req: Request, res: Response, next: NextFunction) {
        const usuario = req.usuario;

        const dadosTatuagem: inputCadastroTatuagem = {
            criado_por: usuario?.id!,
            imagem: req.body.imagem,
            preco: req.body.preco,
            tamanho: req.body.tamanho,
            cor: req.body.cor,
            estilo: req.body.estilo,
            cliente_id: req.body.cliente_id,
            agendamento_id: req.body.agendamento_id,
            tatuador_id: req.body.tatuador_id,
        };

        try {
            const idRegistro = await tatuagemService.cadastrar(dadosTatuagem);

            return res.status(201).json({ message: 'Tatuagem cadastrada com sucesso', id_registro: idRegistro });
        } catch (err) {
            next(err);
        }
    }

    // public async listarTatuagens(req: Request, res: Response) {
    //     const lista = await tatuagemService.buscar();

    //     if (lista.length === 0) return res.status(200).send([]);

    //     return res.status(200).json(lista);
    // }

    // public async deletarTatuagem(req: Request, res: Response) {
    //     const idTatuador = req.params.id;
    //     const idToken = req.usuario?.id;

    //     const success = await tatuagemService.deletar(idTatuador, idToken!);

    //     if (!success) return res.status(400).send('Tatuador não encontrado')

    //     return res.status(200).json({ mensagem: 'Tatuador deletado', dados: success })
    // }

    // public async editarTatuagem(req: Request, res: Response) {
    //     const {
    //         body: novosDados,
    //         params: { id },
    //     } = req as unknown as { body: DadosCadastraisTatuador; params: { id: string } };
        
    //     if (!id) return res.status(400).json({ message: "ID do tatuador não fornecido" });

    //     const tatuadorBuscado = await tatuagemService.atualizarTatuador(id, novosDados);

    //     if (!tatuadorBuscado) return res.status(404).json({ message: "Tatuador não encontrado" });

    //     return res.status(200).json(tatuadorBuscado);
    // }

    // public async buscarTatuagem(req: Request, res: Response, next: NextFunction) {
    //     const tatuadorBuscado = await tatuagemService.buscarPorId(req.params.id);

    //     if (!tatuadorBuscado) return res.status(404).json({ message: "Tatuador não encontrado" });

    //     return res.status(200).json(tatuadorBuscado);
    // }
}

export const tatuagemController = new TatuagemController();
