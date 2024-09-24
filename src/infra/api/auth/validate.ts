import * as Joi from 'joi'

export default {
  postLogin: {
    payload: Joi.object({
      email: Joi.string().email().required(),
      senha: Joi.string().required()
    })
  }
}
