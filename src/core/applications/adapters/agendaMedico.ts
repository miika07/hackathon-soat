import { AgendaMedicoEntity } from "../../domain/entities/agendaMedico";
import { MedicoEntity } from "../../domain/entities/medico";
import { PacienteEntity } from "../../domain/entities/paciente";
import { AgendaMedico } from "../models/agendaMedico";

export const parserAgendaMedico = (agendaMedicoDB: AgendaMedicoEntity): AgendaMedico => {
    return {
        ...agendaMedicoDB.id && { id: agendaMedicoDB.id },
        data: agendaMedicoDB.data,
        horario: agendaMedicoDB.horario,
        medicoId: agendaMedicoDB.medico.id,
        pacienteId: agendaMedicoDB.paciente ? agendaMedicoDB.paciente.id : null
    };
};

export const parserAgendasMedicos = (agendaMedicoDB: AgendaMedicoEntity[]): any[] => {
    const agendas: any[] = [];
    if (agendaMedicoDB.length) {
        agendaMedicoDB.forEach((agenda: AgendaMedicoEntity) => {
            agendas.push(parserAgendaMedico(agenda));
        });
    }
    return agendas;
};

export const parserAgendaMedicoDB = (data: string, horario: string, medico: MedicoEntity, paciente: PacienteEntity | null): AgendaMedicoEntity => {
    const agenda = new AgendaMedicoEntity(data, horario, medico, paciente);
    return agenda;
};
