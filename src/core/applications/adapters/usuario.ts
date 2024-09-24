import { UsuarioEntity } from "../../domain/entities/usuario";
import { PerfilEnum, Usuario } from "../models/usuario";


export const parserUsuario = (usuarioDB: UsuarioEntity): Usuario => {
    return {
        ...usuarioDB.id && { id: usuarioDB.id },
        senha: usuarioDB.senha,
        email: usuarioDB.email,
        perfil: usuarioDB.perfil
    }
}

export const parserUsuarios = (usuarioDB: UsuarioEntity[]): Usuario[] => {
    const usuarios: Usuario[] = [];
    if (usuarioDB.length) {
        usuarioDB.forEach((usuario: UsuarioEntity) => {
            usuarios.push({
                ...usuario.id && { id: usuario.id },
                senha: usuario.senha,
                email: usuario.email,
                perfil: usuario.perfil
            })
        });
    }
    return usuarios;
}

export const parserUsuarioDB = (email: string, senha: string, perfil: PerfilEnum): UsuarioEntity => {
    const usuario = new UsuarioEntity(email, senha, perfil);
    return usuario;
}