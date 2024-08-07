import { Router } from 'express';
import { controllerTatuador } from '../controllers/tatuador.controller';
import { validateBuscarTatuador, validateTatuadorCadastro } from '../validators/tatuador.validator';
const router = Router();

router
    .get(
        '/tatuadores',
        controllerTatuador.listarTatuadores
    )
    .post(
        '/tatuadores',
        validateTatuadorCadastro,
        controllerTatuador.cadastrarTatuador
    )
    .get(
        '/tatuadores/:id',
        validateBuscarTatuador,
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