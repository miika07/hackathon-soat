import { PacienteEntity } from "../../domain/entities/paciente";
import { UsuarioEntity } from "../../domain/entities/usuario";
import { Paciente } from "../models/paciente";


export const parserPaciente = (pacienteDB: PacienteEntity) : Paciente => {
    return {
        ...pacienteDB.id && { id: pacienteDB.id },
        nome: pacienteDB.nome,
        cpf: pacienteDB.cpf,
        usuarioId: pacienteDB.usuario.id,
        email: pacienteDB.usuario.email
    }
}

export const parserPacientes = (pacienteDB: PacienteEntity[]) : Paciente[] => {
    const pacientes: Paciente[] = [];
    if(pacienteDB.length){
        pacienteDB.forEach((paciente: PacienteEntity) => {
            pacientes.push({
                ...paciente.id && { id: paciente.id },
                nome: paciente.nome,
                cpf: paciente.cpf,
                usuarioId: paciente.usuario.id
            }) 
        });
    } 
    return pacientes;
}

export const parserPacientesDB = (nome: string, cpf: string, usuario: UsuarioEntity): PacienteEntity => {
    const paciente = new PacienteEntity(nome, cpf, usuario);
    return paciente;
}