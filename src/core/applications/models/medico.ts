import { AgendaMedico } from "./agendaMedico";

export class Medico {
    id?: string;
    nome: string;
    cpf: string;
    crm: string;
    usuarioId: string;
    agendas?: AgendaMedico[];

    constructor(nome: string, cpf: string, crm: string, usuarioId: string, agendas: AgendaMedico[] = []) {
        this.nome = nome;
        this.cpf = cpf;
        this.crm = crm;
        this.usuarioId = usuarioId;
        this.agendas = agendas;
    }
}