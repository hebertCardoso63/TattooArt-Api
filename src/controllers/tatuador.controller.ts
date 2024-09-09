import { Request, Response, NextFunction } from "express";
import { tatuadorService } from "../services/tatuador.service";
import { usuarioService } from "../services/usuario.service";
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

        const success = await tatuadorService.deletar(idTatuador, idToken!);

        if (!success) return res.status(400).json({ error: 'Tatuador não encontrado' })

        return res.status(200).json({ mensagem: 'Tatuador deletado', dados: success })
    }

    public async listarTatuadores(req: Request, res: Response) {
        const lista = await tatuadorService.buscar();

        if (lista.length === 0) return res.status(200).send([]);

        return res.status(200).json(lista);
    }

    public async editarTatuador(req: Request, res: Response) {
        const {
            body: novosDados,
            params: { id },
        } = req as unknown as { body: DadosCadastraisTatuador; params: { id: string } };
        
        if (!id) return res.status(400).json({ error: "ID do tatuador não fornecido" });

        const tatuadorBuscado = await tatuadorService.atualizarTatuador(id, novosDados);

        if (!tatuadorBuscado) return res.status(404).json({ error: "Tatuador não encontrado" });

        return res.status(200).json(tatuadorBuscado);
    }

    public async buscarTatuador(req: Request, res: Response, next: NextFunction) {
        const tatuadorBuscado = await tatuadorService.buscarPorId(req.params.id);

        if (!tatuadorBuscado) return res.status(404).json({ error: "Tatuador não encontrado" });

        return res.status(200).json(tatuadorBuscado);
    }

    public async cadastrarTatuador(req: Request, res: Response, next: NextFunction) {
        const usuario_id = req.usuario?.id!;
        const usuario = await usuarioService.buscaContaUsuario(usuario_id);
        const nome_completo = usuario?.nome_completo ?? '';
 

        const dadosTatuador: DadosCadastraisTatuador = {
            usuario_id: req.body.usuario_id,
            nome: nome_completo,
            experiencia: req.body.experiencia,
            endereco_atendimento: req.body.endereco_atendimento,
            status: req.body.status,
            tipo: req.body.tipo,
            imagem_perfil: req.body.imagem_perfil,
            imagem_capa: req.body.imagem_capa,
            estilo_tatuagem: req.body.estilo_tatuagem,
            redes_sociais: req.body.redes_sociais,
        };

        try {
            const idRegistro = await tatuadorService.cadastrar(dadosTatuador);

            return res.status(201).json({ error: 'Tatuador cadastrado com sucesso', id_registro: idRegistro });
        } catch (err) {
            return res.status(500).send({ error: 'Erro ao cadastrar tatuador' });
        }
    }
}

export const controllerTatuador = new ControllerTatuador();
