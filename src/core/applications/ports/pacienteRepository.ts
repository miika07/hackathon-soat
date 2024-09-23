import { PacienteEntity } from "../../domain/entities/paciente";

export interface PacienteRepositoryInterface {
    criarPaciente(paciente: PacienteEntity): Promise<PacienteEntity>;
    buscarTodosPacientes(): Promise<PacienteEntity[]>;
    buscarPacientePorId(id: string): Promise<PacienteEntity | undefined>;
    buscarPacientePorCPF(cpf: string): Promise<PacienteEntity | undefined>; 
    atualizarPaciente(paciente: PacienteEntity): Promise<PacienteEntity>;
    deletarPaciente(id: string): Promise<boolean>;
}