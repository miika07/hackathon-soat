import { UsuarioEntity } from "../../domain/entities/usuario";

export interface UsuarioRepositoryInterface {
    criarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    buscarTodosUsuarios(): Promise<UsuarioEntity[]>;
    buscarUsuarioPorId(id: string): Promise<UsuarioEntity | undefined>;
    buscarUsuarioPorEmail(email: string): Promise<UsuarioEntity | undefined>; 
    atualizarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity>;
    deletarUsuario(id: string): Promise<boolean>;
}