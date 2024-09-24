import * as Hapi from '@hapi/hapi'
import MedicoController from './authController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class MedicoRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Medicos - Adicionando rotas')

      const controller = new MedicoController()

      server.route([
        {
          method: 'POST',
          path: '/login',
          options: {
            handler: controller.login,
            validate: validate.postLogin,
            description: 'Adiciona um medico',
            tags: ['api', 'medicos'],
            auth: {
              mode: "optional"
            }
          }
        }
      ])

      Logger.info('Medicos - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
