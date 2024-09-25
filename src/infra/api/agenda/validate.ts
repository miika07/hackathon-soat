import * as Joi from 'joi'

export default {
  getById: {
    params: Joi.object().keys({
      id: Joi.string().required()
    })
  }
}
