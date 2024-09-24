import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  getByCPF: {
    params: Joi.object().keys({
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  },
  postPaciente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  },
  updatePaciente: {
    payload: Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    })
  }
}
