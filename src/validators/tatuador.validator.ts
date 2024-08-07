import { Request, Response, NextFunction } from 'express';
import { cadastrarTatuadorSchema, buscarTatuador } from './schemas/tatuador.schema'


export const validateTatuadorCadastro = (req: Request, res: Response, next: NextFunction) => {
    const { error } = cadastrarTatuadorSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

export const validateBuscarTatuador = (req: Request, res: Response, next: NextFunction) => {
    const { error } = buscarTatuador.validate(req.params.id);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};