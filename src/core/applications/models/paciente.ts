import { AgendaMedico } from "./agendaMedico";

export class Paciente {
    id?: string; 
    nome: string;
    cpf: string;
    usuarioId: string;
    agenda?: AgendaMedico[];

    constructor(nome: string, cpf: string, usuarioId: string, agenda: AgendaMedico[] = []) {
        this.nome = nome;
        this.cpf = cpf;
        this.usuarioId = usuarioId;
        this.agenda = agenda;
    }
}