import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      medicoId: Joi.string().required()
    })
  },
  postAgenda: {
    payload: Joi.object({
      pacienteId: Joi.string(),
      data: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
      horario: Joi.string().pattern(/^\d{2}:\d{2}$/).required()
    })
  },
  patchAgenda: {
    payload: Joi.object({
      agendaId: Joi.string().required(),
      pacienteId: Joi.string(),
      data: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4}$/).required(),
      horario: Joi.string().pattern(/^\d{2}:\d{2}$/).required()
    })
  },
  agendaPostConsulta: {
    payload: Joi.object({
      agendaId: Joi.string().required(),
      pacienteId: Joi.string().required()
    })
  }

}
