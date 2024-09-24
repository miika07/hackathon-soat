import * as Hapi from '@hapi/hapi';
import Logger from '../../../plugins/logger.plugin';
import { ok } from 'assert';
import MedicoRepositoryAdapter from '../../adapter/medico/medicoRepositoryAdapter';
import { MedicoEntity } from '../../../core/domain/entities/medico';
import { AppDataSource } from '../../data/database/data-source';
import { AppDataSourceTest } from '../../data/database/data-source-teste';
import MedicoManagerUseCase from '../../../core/applications/usecases/medico/medicoManagerUseCase';
import UsuarioRepositoryAdapter from '../../adapter/usuario/usuarioRepositoryAdapter';
import { UsuarioEntity } from '../../../core/domain/entities/usuario';
import AuthManagerUseCase from '../../../core/applications/usecases/auth/authManagerUseCase';

export default class MedicoController {

    private usuarioRepository = process.env.NODE_ENV == 'test'
        ? AppDataSourceTest.getRepository(UsuarioEntity)
        : AppDataSource.getRepository(UsuarioEntity);

    private userAdapter: UsuarioRepositoryAdapter = new UsuarioRepositoryAdapter(this.usuarioRepository);
    private readonly authManagerUseCase: AuthManagerUseCase = new AuthManagerUseCase(this.userAdapter);


    public login = async (
        request: Hapi.Request, h: Hapi.ResponseToolkit
    ): Promise<any> => {
        try {
            const body = request.payload as { email: string, senha: string};
            const data = await this.authManagerUseCase.login(body.email, body.senha);
            return h.response(data);
        } catch (error) {
            Logger.error(`Error in POST /login: ${error.message}`);
            return h.response({ error: error.message }).code(400)
        }
    }

}