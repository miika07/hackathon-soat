import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import AgendaManagerUseCase from '../../../core/applications/usecases/agenda/agendaManagerUseCase';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { AppDataSource } from '../../data/database/data-source';
import { PacienteEntity } from '../../../core/domain/entities/paciente';
import { MedicoEntity } from '../../../core/domain/entities/medico';
import PacienteRepositoryAdapter from '../../adapter/paciente/pacienteRepositoryAdapter';
import MedicoRepositoryAdapter from '../../adapter/medico/medicoRepositoryAdapter';
import { AgendaMedicoEntity } from '../../../core/domain/entities/agendaMedico';
import AgendaMedicoRepositoryAdapter from '../../adapter/agenda/AgendaMedicoRepositoryAdapter';

export default class AgendaController {
    

    private agendaMedicoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(AgendaMedicoEntity)
        : AppDataSource.getRepository(AgendaMedicoEntity);

    private pacienteRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(PacienteEntity)
        : AppDataSource.getRepository(PacienteEntity);

    private medicoRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(MedicoEntity)
        : AppDataSource.getRepository(MedicoEntity);

    private agendaAdapter: AgendaMedicoRepositoryAdapter = new AgendaMedicoRepositoryAdapter(this.agendaMedicoRepository);
    private pacienteAdapter: PacienteRepositoryAdapter = new PacienteRepositoryAdapter(this.pacienteRepository);
    private medicoAdapter: MedicoRepositoryAdapter = new MedicoRepositoryAdapter(this.medicoRepository);

    private readonly agendaManagerUseCase: AgendaManagerUseCase = new AgendaManagerUseCase(this.pacienteAdapter, this.medicoAdapter, this.agendaAdapter);
    
    public enviarEmail = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.agendaManagerUseCase.enviarEmailTeste();
            return h.response({});
        } catch (error) {
            Logger.error(`Error in GET /medicos: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }    
}