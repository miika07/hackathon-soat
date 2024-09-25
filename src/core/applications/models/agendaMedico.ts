export enum HoraEnum {
    H07 = "07:00",
    H08 = "08:00",
    H09 = "09:00",
    H10 = "10:00",
    H11 = "11:00",
    H12 = "12:00",
    H13 = "13:00",
    H14 = "14:00",
    H15 = "15:00",
    H16 = "16:00",
    H17 = "17:00",
    H18 = "18:00",
    H19 = "19:00"
}

export const horariosDeAgenda: string[] = [
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00"
];

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