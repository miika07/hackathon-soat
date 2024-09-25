import MedicoRepositoryAdapter from "../../../../infra/adapter/medico/medicoRepositoryAdapter";
import PacienteRepositoryAdapter from "../../../../infra/adapter/paciente/pacienteRepositoryAdapter";
import UsuarioRepositoryAdapter from "../../../../infra/adapter/usuario/usuarioRepositoryAdapter";
import { UsuarioEntity } from "../../../domain/entities/usuario";
import { PerfilEnum } from "../../models/usuario";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export default class AuthManagerUseCase {

    private userAdapter;
    private pacienteAdapter;
    private medicoAdapter;
    private jwtSecret: string;

    constructor(userAdapter: UsuarioRepositoryAdapter, pacienteAdapter: PacienteRepositoryAdapter, medicoAdapter: MedicoRepositoryAdapter) {
        this.userAdapter = userAdapter;
        this.pacienteAdapter = pacienteAdapter;
        this.medicoAdapter = medicoAdapter;
        this.jwtSecret = "stubJWT";
    }

    async login(email: string, senha: string): Promise<{ token: string } | null> {

        try {
            const usuario: UsuarioEntity = await this.userAdapter.buscarUsuarioPorEmail(email);
            if (!usuario) {
                throw new Error('Usuário inválido.');
            }

            const match = await bcrypt.compare(senha, usuario.senha);
            if (!match) {
                throw new Error('Usuário inválido.');
            }

            let idPerfil = null;

            if (usuario.perfil == PerfilEnum.PACIENTE) {
                idPerfil = await this.pacienteAdapter.buscarPacientePoUsuarioId(usuario);
            } else if (usuario.perfil == PerfilEnum.MEDICO) {
                idPerfil = await this.medicoAdapter.buscarMedicoPorUsuarioId(usuario);
            }else {
                throw new Error("Perfil não existe.");
            }

            const payload = { idPerfil: idPerfil.id, id: usuario.id, email: usuario.email, perfil: usuario.perfil, scope: usuario.perfil };
            const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '4h' });

            return { token };
        } catch {
            throw new Error("Credenciais inválidas");
        }
    }

    async decryptToken(token: string) : Promise<any> {
        const decoded = jwt.verify(token, this.jwtSecret);
        return decoded;
    }
}
