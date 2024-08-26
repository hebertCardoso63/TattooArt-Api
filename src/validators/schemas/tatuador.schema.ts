import Joi from 'joi';


export const buscarTatuador = Joi.string().uuid().required();

export const cadastrarTatuadorSchema = Joi.object({
    nome: Joi.string().required().messages({
        'string.empty': 'O nome é obrigatório',
        'any.required': 'O nome é obrigatório',
    }),
    experiencia: Joi.number().required().min(1).messages({
        'number.base': 'A experiência deve ser um número',
        'number.min': 'A experiência deve ser pelo menos 1',
        'any.required': 'A experiência é obrigatória',
    }),
    status: Joi.string().required().messages({
        'string.empty': 'O status é obrigatório',
        'any.required': 'O status é obrigatório',
    }),
    tipo: Joi.string().required().messages({
        'string.empty': 'O tipo é obrigatório',
        'any.required': 'O tipo é obrigatório',
    }),
    estudio_id: Joi.string().uuid().optional().messages({
        'string.guid': 'O ID do estúdio deve ser um UUID válido',
    }),
    imagem_perfil: Joi.string().uri().messages({
        'string.uri': 'A imagem de perfil deve ser uma URL válida',
        'any.required': 'A imagem de perfil é obrigatória',
    }),
    estilo_tatuagem: Joi.array().items(Joi.string()).optional().messages({
        'array.base': 'O estilo de tatuagem deve ser uma lista de strings',
    }),
    redes_sociais: Joi.object().optional().messages({
        'object.base': 'As redes sociais devem ser um objeto',
    }),
    usuario_id: Joi.string().uuid().required().messages({
        'string.guid': 'O ID do estúdio deve ser um UUID válido',
    }),
});