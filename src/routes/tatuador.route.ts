import { Router } from 'express';
import { controllerTatuador } from '../controllers/tatuador.controller';
const router = Router();

router
    .get(
        '/tatuadores',
        controllerTatuador.listarTatuadores
    )
    .post(
        '/tatuadores',
        controllerTatuador.cadastrarTatuador
    )
    .get(
        '/tatuadores/:id',
        controllerTatuador.buscarTatuador
    )
    .patch(
        '/tatuadores/:id',
        controllerTatuador.editarTatuador,
    )
    .delete(
        '/tatuadores/:id',
        controllerTatuador.deletarTatuador,
    );

export default router;