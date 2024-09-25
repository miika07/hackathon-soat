import * as Hapi from '@hapi/hapi'
import PacienteController from './pacienteController'
import Logger from '../../../plugins/logger.plugin'
import IRoute from '../../../helper/route'
import validate from './validate'

export default class PacienteRoutes implements IRoute {
  public async register (server: Hapi.Server): Promise<any> {
    return await new Promise<void>(resolve => {
      Logger.info('Pacientes - Adicionando rotas')

      const controller = new PacienteController()

      server.route([
        {
          method: 'GET',
          path: '/paciente/all',
          options: {
            handler: controller.buscarTodosPacientes,
            description: 'Busca todos os pacientes',
            tags: ['api', 'pacientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/paciente/{id}',
          options: {
            handler: controller.buscarPacientePorID,
            validate: validate.getById,
            description: 'Busca um paciente por id',
            tags: ['api', 'pacientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
          method: 'GET',
          path: '/paciente/cpf/{cpf}',
          options: {
            handler: controller.buscarPacientePorCPF,
            validate: validate.getByCPF,
            description: 'Busca um paciente por cpf',
            tags: ['api', 'pacientes'],
            auth: {
              mode: "optional"
            }
          }
        },
        {
            method: 'POST',
            path: '/paciente',
            options: {
              handler: controller.adicionarPaciente,
              validate: validate.postPaciente,
              description: 'Adiciona um paciente',
              tags: ['api', 'pacientes'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'DELETE',
            path: '/paciente/{id}',
            options: {
              handler: controller.deletarPaciente,
              validate: validate.getById,
              description: 'Deleta um paciente',
              tags: ['api', 'pacientes'],
              auth: {
              mode: "optional"
            }
            }
        },
        {
            method: 'PUT',
            path: '/paciente',
            options: {
              handler: controller.atualizarPaciente,
              validate: validate.updatePaciente,
              description: 'Atualiza um paciente',
              tags: ['api', 'pacientes'],
              auth: {
              mode: "optional"
            }
            }
        }
      ])

      Logger.info('Pacientes - Finalizando de adicionar rotas')
      resolve()
    })
  }
}
