import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import MedicoRepositoryAdapter from '../../adapter/medico/medicoRepositoryAdapter';
import { MedicoEntity } from '../../../core/domain/entities/medico';
import { AppDataSource } from '../../data/database/data-source';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import MedicoManagerUseCase from '../../../core/applications/usecases/medico/medicoManagerUseCase';

export default class MedicoController {
    
    private medicoRepository = process.env.NODE_ENV == 'test'
            ? AppDataSourceTest.getRepository(MedicoEntity)
            : AppDataSource.getRepository(MedicoEntity);
    private adapter: MedicoRepositoryAdapter = new MedicoRepositoryAdapter(this.medicoRepository);
    private readonly medicoManagerUseCase: MedicoManagerUseCase = new MedicoManagerUseCase(this.adapter);
    

    public buscarTodosMedicos = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.medicoManagerUseCase.buscarTodosMedicos()
            return h.response(data);
        } catch (error) {
            Logger.error(`Error in GET /medicos: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarMedicoPorID = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.medicoManagerUseCase.buscarMedicoPorId(request.params.id)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /medico/{id}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public buscarMedicoPorCPF = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const data = await this.medicoManagerUseCase.buscarMedicoPorCPF(request.params.cpf)
            if (data){
              return h.response(data).code(200);
            }
            return h.response({ error: 'Not found'}).code(404);
        } catch (error) {
            Logger.error(`Error in GET /medico/{cpf}: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public adicionarMedico = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string, crm: string, senha: string};
            const data = await this.medicoManagerUseCase.criarMedico(body.nome, body.cpf, body.crm, body.email, body.senha);
            if (data) {
              return h.response(data);
            }
            return h.response({error: 'Medico já existe'}).code(400)
        } catch (error) {
            Logger.error(`Error in POST /medicos: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public deletarMedico = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            await this.medicoManagerUseCase.deletarMedico(request.params.id)
            return h.response(ok)
        } catch (error) {
            Logger.error(`Error in DELETE /medico: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }

    public atualizarMedico = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { nome: string, email: string, cpf: string };
            const data = await this.medicoManagerUseCase.atualizarMedico(body.cpf, body.nome, body.email)
            return h.response(data)
        } catch (error) {
            Logger.error(`Error in PUT /medico: ${error.message}`);
            return h.response({ error: 'Internal Server Error' }).code(500)
        }
    }
}