import { AgendaMedicoEntity } from "../../domain/entities/agendaMedico";
import { UsuarioEntity } from "../../domain/entities/usuario";

export interface AgendaMedicoRepositoryInterface {
    criarAgendaMedico(agendamedico: AgendaMedicoEntity): Promise<AgendaMedicoEntity>;
    buscarTodosAgendaMedicos(): Promise<AgendaMedicoEntity[]>;
    buscarAgendaMedicoPorId(id: string): Promise<AgendaMedicoEntity | undefined>;
    buscarAgendaPorDataHoraIdMedico(data: string, horario: string, idMedico: string): Promise<AgendaMedicoEntity | undefined>; 
    atualizarAgendaMedico(agendamedico: AgendaMedicoEntity): Promise<AgendaMedicoEntity>;
    deletarAgendaMedico(id: string): Promise<boolean>;
    buscarAgendasDeUmMedico(id: string): Promise<AgendaMedicoEntity[] | undefined>;
    buscarAgendasDeUmPaciente(id: string): Promise<AgendaMedicoEntity[] | undefined>;
}