export enum PerfilEnum {
    PACIENTE = "paciente",
    MEDICO = 'medico'
}

export class Usuario {
    id?: string;
    email: string;
    senha: string;
    perfil: string;

    constructor(email: string, senha: string, perfil: PerfilEnum) {
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
    }
}