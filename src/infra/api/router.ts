import * as Hapi from '@hapi/hapi'
import Medicos from './medico/medicoRoutes'
import Logger from '../../plugins/logger.plugin'
import Paciente from './paciente/pacienteRoutes';
import Auth from './auth/authRoutes';
import Agenda from './agenda/agendaRoutes';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    Logger.info('Router - Start adding routes')

    await new Medicos().register(server);
    await new Paciente().register(server);
    await new Auth().register(server);
    await new Agenda().register(server);

    Logger.info('Router - Finish adding routes')
  }
}