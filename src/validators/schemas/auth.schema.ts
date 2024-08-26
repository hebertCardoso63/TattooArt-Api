import Joi from 'joi';

export const authSchema = Joi.object({
    nome_usuario: Joi.string().required().messages({
        'string.empty': 'O Nome do usuário é obrigatório',
        'any.required': 'O Nome do usuário é obrigatório',
    }),
    senha: Joi.string().required().messages({
        'string.empty': 'A senha é obrigatória',
        'any.required': 'A senha é obrigatória',
    }),
});