import Joi from 'joi';

export const cadastrarTatuagemSchema = Joi.object({
    imagem: Joi.string().required().messages({
        'string.uri': 'A imagem deve ser uma URL válida',
        'any.required': 'A imagem é obrigatória',
    }),
    preco: Joi.number().optional().min(0).messages({
        'number.base': 'O preço deve ser um número',
        'number.min': 'O preço deve ser um valor positivo',
    }),
    tamanho: Joi.number().optional().min(0).messages({
        'number.base': 'O tamanho deve ser um número',
        'number.min': 'O tamanho deve ser um valor positivo',
    }),
    cor: Joi.string().optional().messages({
        'string.base': 'A cor deve ser uma string',
    }),
    estilo: Joi.string().optional().messages({
        'string.base': 'O estilo deve ser uma string',
    }),
    cliente_id: Joi.string().uuid().optional().messages({
        'string.guid': 'O ID do cliente deve ser um UUID válido',
    }),
    agendamento_id: Joi.string().uuid().optional().messages({
        'string.guid': 'O ID do agendamento deve ser um UUID válido',
    }),
    tatuador_id: Joi.string().uuid().optional().messages({
        'string.guid': 'O ID do tatuador deve ser um UUID válido',
    }),
});
