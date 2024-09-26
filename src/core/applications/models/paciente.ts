import { AgendaMedico } from "./agendaMedico";

export class Paciente {
    id?: string; 
    nome: string;
    cpf: string;
    usuarioId: string;
    email?: string;
    agenda?: AgendaMedico[];

    constructor(nome: string, cpf: string, usuarioId: string, agenda: AgendaMedico[] = [], email?: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.usuarioId = usuarioId;
        this.agenda = agenda;
        this.email = email;
    }
}