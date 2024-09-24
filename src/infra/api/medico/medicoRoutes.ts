import * as Hapi from '@hapi/hapi'
import MedicoController from './medicoController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'
import { PerfilEnum } from '../../../core/applications/models/usuario'

export default class MedicoRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Medicos - Adicionando rotas')

      const controller = new MedicoController()

      server.route([
        {
          method: 'GET',
          path: '/api/medicos',
          options: {
            handler: controller.buscarTodosMedicos,
            description: 'Busca todos os medicos',
            tags: ['api', 'medicos'],
            auth: {
              strategy: 'jwt',
              scope: [PerfilEnum.PACIENTE]
          }

          }
        },
        {
          method: 'GET',
          path: '/api/medico/{id}',
          options: {
            handler: controller.buscarMedicoPorID,
            validate: validate.getById,
            description: 'Busca um medico por id',
            tags: ['api', 'medicos'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/api/medico-cpf/{cpf}',
          options: {
            handler: controller.buscarMedicoPorCPF,
            validate: validate.getByCPF,
            description: 'Busca um medico por cpf',
            tags: ['api', 'medicos'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
            method: 'POST',
            path: '/api/medico',
            options: {
              handler: controller.adicionarMedico,
              validate: validate.postMedico,
              description: 'Adiciona um medico',
              tags: ['api', 'medicos'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'DELETE',
            path: '/api/medico/{id}',
            options: {
              handler: controller.deletarMedico,
              validate: validate.getById,
              description: 'Deleta um medico',
              tags: ['api', 'medicos'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'PUT',
            path: '/api/medico',
            options: {
              handler: controller.atualizarMedico,
              validate: validate.updateMedico,
              description: 'Atualiza um medico',
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
