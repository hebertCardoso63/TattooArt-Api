import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import { internalErrorsMiddleware } from '../middlewares/error.middleware';
import { validateUsuariosAtualizarPerfil } from '../validators/usuario.validator';

const router = Router();

router
    .get(
        '/usuarios/perfil/:id', 
        [
            usuarioController.getBuscarContaUsuario,
            internalErrorsMiddleware,
        ]
    )
    .delete(
        '/usuarios/excluir-perfil/:id',
        [
            usuarioController.deleteContaUsuario,
            internalErrorsMiddleware,
        ]
    )
    .patch(
        '/usuarios/atualizar-perfil/:id', 
        [
            validateUsuariosAtualizarPerfil,
            usuarioController.patchContaUsuario,
            internalErrorsMiddleware,
        ]
    );

export default router;
