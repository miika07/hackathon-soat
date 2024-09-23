export class AgendaMedico {
    id?: string;
    data: string;
    horario: string;
    medicoId: string;
    pacienteId?: string;

    constructor(data: string, horario: string, medicoId: string, pacienteId?: string) {
        this.data = data;
        this.horario = horario;
        this.medicoId = medicoId;
        this.pacienteId = pacienteId || null;
    }
}