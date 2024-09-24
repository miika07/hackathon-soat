import { Repository } from "typeorm";
import { UsuarioEntity } from "../../../core/domain/entities/usuario";
import { UsuarioRepositoryInterface } from "../../../core/applications/ports/usuarioRepository";

export default class UsuarioRepositoryAdapter implements UsuarioRepositoryInterface {

    private usuarioRepository: Repository<UsuarioEntity>;

    constructor(usuarioRepository: Repository<UsuarioEntity>) {
        this.usuarioRepository = usuarioRepository;
    }

    async criarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        return await this.usuarioRepository.save(usuario);
    }

    async buscarTodosUsuarios(): Promise<UsuarioEntity[]> {
        return await this.usuarioRepository.find();
    }

    async buscarUsuarioPorId(id: string): Promise<UsuarioEntity | undefined> {
        return await this.usuarioRepository.findOne({ where: { id: id } });
    }

    async buscarUsuarioPorEmail(email: string): Promise<UsuarioEntity | undefined> {
        return await this.usuarioRepository.findOne({ where: { email: email } });
    }

    async atualizarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
       return await this.usuarioRepository.save(usuario);
    }

    async deletarUsuario(id: string): Promise<boolean> {
        const result = await this.usuarioRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}
