import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import AgendaManagerUseCase from '../../../core/applications/usecases/agenda/agendaManagerUseCase.usecase';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import { AppDataSource } from '../../data/database/data-source';
import { PacienteEntity } from '../../../core/domain/entities/paciente';
import { MedicoEntity } from '../../../core/domain/entities/medico';
import PacienteRepositoryAdapter from '../../adapter/paciente/pacienteRepositoryAdapter';
import MedicoRepositoryAdapter from '../../adapter/medico/medicoRepositoryAdapter';
import { AgendaMedicoEntity } from '../../../core/domain/entities/agendaMedico';
import AgendaMedicoRepositoryAdapter from '../../adapter/agenda/AgendaMedicoRepositoryAdapter';
import { decryptToken } from '../../../helper/helper';
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


    public medicoAdicionaAgenda = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { data: string, horario: string, pacienteId: string };
            const authorizationHeader = request.headers.authorization;
            const tokenClean = authorizationHeader.replace('Bearer ', '');
            const token = await decryptToken(tokenClean);

            const data = await this.agendaManagerUseCase.medicoAdicionaAgenda(body.data, body.horario, token.idPerfil, body.pacienteId);
            if (data) {
                return h.response(data);
            }
            return h.response({ error: 'Agenda já existe' }).code(400)
        } catch (error) {
            Logger.error(`Error in POST /agenda: ${error.message}`);
            return h.response({ error: error.message }).code(500)
        }
    }

    public medicoAtualizaAgenda = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { agendaId: string, data: string, horario: string, pacienteId: string };
            const authorizationHeader = request.headers.authorization;
            const tokenClean = authorizationHeader.replace('Bearer ', '');
            const token = await decryptToken(tokenClean);

            const data = await this.agendaManagerUseCase.medicoAtualizaAgenda(body.agendaId, body.data, body.horario, token.idPerfil, false, body.pacienteId);

            if (data) {
                return h.response(data);
            }
            return h.response({ error: 'Não foi possível atualizar a agenda.' }).code(400)
        } catch (error) {
            Logger.error(`Error in PATCH /agenda: ${error.message}`);
            return h.response({ error: error.message }).code(500)
        }
    }

    public pacienteAgendaConsulta = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const authorizationHeader = request.headers.authorization;
            const tokenClean = authorizationHeader.replace('Bearer ', '');
            const token = await decryptToken(tokenClean);
            const body = request.payload as { agendaId: string, pacienteId: string };

            const data = await this.agendaManagerUseCase.pacienteAgendaConsulta(body.agendaId, token.idPerfil);

            if (data) {
                return h.response(data);
            }
            return h.response({ error: 'Não foi possível agendar a consulta.' }).code(400)

        } catch (error) {
            Logger.error(`Error in POST /agenda/consulta: ${error.message}`);
            return h.response({ error: error.message }).code(500)
        }

    }

    public buscarAgendasDeUmMedico = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.agendaManagerUseCase.buscarAgendasDeUmMedico(request.params.medicoId);

            if (data) {
                return h.response(data);
            }
            return h.response({ error: 'Não foi possível buscar a agenda.' }).code(400)

        } catch (error) {
            Logger.error(`Error in GET /agenda/medico/{medicoId}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }

    }

    public buscarAgendasDeUmPaciente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.agendaManagerUseCase.buscarAgendasDeUmPaciente(request.params.pacienteId);

            if (data) {
                return h.response(data);
            }
            return h.response({ error: 'Não foi possível buscar a agenda.' }).code(400)

        } catch (error) {
            Logger.error(`Error in GET /agenda/paciente/{pacienteId}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }

    }



}