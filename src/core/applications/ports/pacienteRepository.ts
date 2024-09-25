import { PacienteEntity } from "../../domain/entities/paciente";
import { UsuarioEntity } from "../../domain/entities/usuario";

export interface PacienteRepositoryInterface {
    criarPaciente(paciente: PacienteEntity): Promise<PacienteEntity>;
    buscarTodosPacientes(): Promise<PacienteEntity[]>;
    buscarPacientePorId(id: string): Promise<PacienteEntity | undefined>;
    buscarPacientePorCPF(cpf: string): Promise<PacienteEntity | undefined>; 
    buscarPacientePoUsuarioId(usuario: UsuarioEntity): Promise<PacienteEntity | undefined>; 
    atualizarPaciente(paciente: PacienteEntity): Promise<PacienteEntity>;
    deletarPaciente(id: string): Promise<boolean>;
}