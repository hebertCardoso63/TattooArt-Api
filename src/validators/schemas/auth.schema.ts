import Joi from 'joi';

export const authSchema = Joi.object({
    nome_usuario: Joi.string().required(),
    senha: Joi.string().required(),
});