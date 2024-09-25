import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import AgendaController from './agendaController'
import { PerfilEnum } from '../../../core/applications/models/usuario'

export default class MedicoRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Agenda - Adicionando rotas')

      const controller = new AgendaController()

      server.route([
        {
          method: 'GET',
          path: '/api/agenda',
          options: {
            handler: controller.enviarEmail,
            description: 'Envia email teste',
            tags: ['api','agenda'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/agenda/medico/{medicoId}',
          options: {
            handler: controller.,
            description: 'Retorna os horários disponíveis de um médico',
            tags: ['api','agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.PACIENTE, PerfilEnum.MEDICO]
            }
          }
        },
        {
          method: 'POST',
          path: '/api/agenda',
          options: {
            handler: controller.,
            description: 'Adiciona um horário na agenda',
            tags: ['api','agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.MEDICO]
            }
          }
        }
      ])

      Logger.info('Agenda - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
