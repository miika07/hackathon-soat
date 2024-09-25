import * as Hapi from '@hapi/hapi'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import AgendaController from './agendaController'
import { PerfilEnum } from '../../../core/applications/models/usuario'
import validate from './validate'

export default class MedicoRoutes implements IRoute {
  public async register(server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Agenda - Adicionando rotas')

      const controller = new AgendaController()

      server.route([
        {
          method: 'GET',
          path: '/agenda/{medicoId}',
          options: {
            handler: controller.buscarAgendasDeUmMedico,
            validate: validate.getById,
            description: 'Retorna os horários disponíveis de um médico',
            tags: ['api', 'agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.PACIENTE, PerfilEnum.MEDICO]
            }
          }
        },
        {
          method: 'POST',
          path: '/agenda',
          options: {
            handler: controller.medicoAdicionaAgenda,
            validate: validate.postAgenda,
            description: 'Adiciona um horário na agenda',
            tags: ['api', 'agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.MEDICO]
            }
          }
        },
        {
          method: 'PATCH',
          path: '/agenda',
          options: {
            handler: controller.medicoAtualizaAgenda,
            validate: validate.patchAgenda,
            description: 'Um médico atualiza um horário de sua agenda',
            tags: ['api', 'agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.MEDICO]
            }
          }
        },
        {
          method: 'POST',
          path: '/agenda/consulta',
          options: {
            handler: controller.pacienteAgendaConsulta,
            validate: validate.agendaPostConsulta,
            description: 'Um paciente agenda uma consulta',
            tags: ['api', 'agenda'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.PACIENTE]
            }
          }
        }
      ])

      Logger.info('Agenda - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
