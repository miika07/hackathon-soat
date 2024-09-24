import UsuarioRepositoryAdapter from "../../../../infra/adapter/usuario/usuarioRepositoryAdapter";
import { UsuarioEntity } from "../../../domain/entities/usuario";
import { PerfilEnum } from "../../models/usuario";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class AuthManagerUseCase {
    private userAdapter;
    private jwtSecret: string;

    constructor(userAdapter: UsuarioRepositoryAdapter) {
        this.userAdapter = userAdapter;
        this.jwtSecret = "stubJWT";
    }

    async login(email: string, senha: string): Promise<{ token: string } | null> {

        const usuario: UsuarioEntity = await this.userAdapter.buscarUsuarioPorEmail(email);
        if (!usuario) {
            throw new Error('Usuário inválido.');
        }

        const match = await bcrypt.compare(senha, usuario.senha);
        if (!match) {
            throw new Error('Usuário inválido.');
        }

        const payload = { id: usuario.id, email: usuario.email, perfil: usuario.perfil };
        const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '4h' });

        return { token };
    }
}
