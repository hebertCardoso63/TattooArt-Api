import Joi from 'joi';

export const atualizarPerfilUsuarioSchema = Joi.object({
  nome: Joi.string().optional().messages({
    'string.empty': 'O nome não pode ser vazio',
  }),
  telefone_celular: Joi.string()
    .pattern(/^\+55\d{11}$/)
    .optional()
    .messages({
      'string.empty': 'O telefone não pode ser vazio',
      'string.pattern.base': 'O telefone deve ser um telefone válido',
    }),
  email: Joi.string().email().optional().messages({
    'string.empty': 'O email não pode ser vazio',
    'string.email': 'O email deve ser um email válido',
  }),
  cpf: Joi.string()
    .pattern(/^\d{11}$/)
    .optional()
    .messages({
      'string.empty': 'O CPF deve ser válido',
    }),
  rg: Joi.string().optional().messages({
    'string.empty': 'O rg não pode ser vazio',
  }),
  endereco: Joi.string().optional().messages({
    'string.empty': 'O endereço não pode ser vazio',
  }),
});
