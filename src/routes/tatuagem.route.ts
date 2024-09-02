import { Router } from 'express';
import { tatuagemController } from '../controllers/tatuagem.controller';
import { internalErrorsMiddleware } from '../middlewares/error.middleware';
import { validateCadastroTatuagem } from '../validators/tatuagem.validator';

const router = Router();

router
    .post(
        '/tatuagens',
        [
            tatuagemController.cadastrarTatuagem,
            internalErrorsMiddleware,
        ]
    )
    .get(
        '/tatuagens', 
        [
            tatuagemController.listarTatuagens,
            internalErrorsMiddleware,
        ]
    )
    .get(
        '/tatuagens/:id', 
        [
            tatuagemController.buscarTatuagem,
            internalErrorsMiddleware,
        ]
    )
    .get(
        '/tatuagens/artist/:id', 
        [
            tatuagemController.listarTatuagensByArtist,
            internalErrorsMiddleware,
        ]
    )
    .patch(
        '/tatuagens/:id', 
        [
            tatuagemController.editarTatuagem,
            internalErrorsMiddleware,
        ]
    )
    .delete(
        '/tatuagens/:id',
        [
            tatuagemController.deletarTatuagem,
            internalErrorsMiddleware,
        ]
    );

export default router;
