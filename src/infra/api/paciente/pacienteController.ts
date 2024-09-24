import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import PacienteRepositoryAdapter from '../../adapter/paciente/pacienteRepositoryAdapter';
import { PacienteEntity } from '../../../core/domain/entities/paciente';
import { AppDataSource } from '../../data/database/data-source';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import PacienteManagerUseCase from '../../../core/applications/usecases/paciente/pacienteManagerUseCase';
import UsuarioRepositoryAdapter from '../../adapter/usuario/usuarioRepositoryAdapter';
import { UsuarioEntity } from '../../../core/domain/entities/usuario';

export default class PacienteController {
    
    private pacienteRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(PacienteEntity)
            : AppDataSource.getRepository(PacienteEntity);

    private usuarioRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(UsuarioEntity)
            : AppDataSource.getRepository(UsuarioEntity);

    private adapter: PacienteRepositoryAdapter = new PacienteRepositoryAdapter(this.pacienteRepository);
    private userAdapter: UsuarioRepositoryAdapter = new UsuarioRepositoryAdapter(this.usuarioRepository);
    private readonly pacienteManagerUseCase: PacienteManagerUseCase = new PacienteManagerUseCase(this.adapter, this.userAdapter);
    

    public buscarTodosPacientes = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pacienteManagerUseCase.buscarTodosPacientes()
            return h.response(data);
        } catch (error) {
            Logger.error(`Error in GET /pacientes: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarPacientePorID = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pacienteManagerUseCase.buscarPacientePorId(request.params.id)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /paciente/{id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarPacientePorCPF = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.pacienteManagerUseCase.buscarPacientePorCPF(request.params.cpf)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /paciente/{cpf}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public adicionarPaciente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string, crm: string, senha: string};
            const data = await this.pacienteManagerUseCase.criarPaciente(body.nome, body.email, body.cpf, body.crm, body.senha);
            if (data) {
              return h.response(data);
            }
            return h.response({error: 'Paciente já existe'}).code(400)
        } catch (error) {
            Logger.error(`Error in POST /pacientes: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public deletarPaciente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            await this.pacienteManagerUseCase.deletarPaciente(request.params.id)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in DELETE /paciente: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public atualizarPaciente = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string };
            const data = await this.pacienteManagerUseCase.atualizarPaciente(body.cpf, body.nome, body.email)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /paciente: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}