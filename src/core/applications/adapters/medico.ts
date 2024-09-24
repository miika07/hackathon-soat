import { MedicoEntity } from "../../domain/entities/medico";
import { UsuarioEntity } from "../../domain/entities/usuario";
import { Medico } from "../models/medico";



export const parserMedico = (medicoDB: MedicoEntity) : Medico => {
    return {
        ...medicoDB.id && { id: medicoDB.id },
        nome: medicoDB.nome,
        crm: medicoDB.crm,
        cpf: medicoDB.cpf,
        usuarioId: medicoDB.usuario.id,
        email: medicoDB.usuario.email
    }
}

export const parserMedicos = (medicoDB: MedicoEntity[]) : Medico[] => {
    const medicos: Medico[] = [];
    if(medicoDB.length){
        medicoDB.forEach((medico: MedicoEntity) => {
            let usuario: UsuarioEntity = medico.usuario;
            medicos.push({
                ...medico.id && { id: medico.id },
                nome: medico.nome,
                cpf: medico.cpf,
                crm: medico.crm,
                email: usuario.email,
                usuarioId: usuario.id
            }) 
        });
    } 
    return medicos;
}

export const parserMedicosDB = (nome: string, cpf: string, crm: string, usuarioId: UsuarioEntity): MedicoEntity => {
    const medico = new MedicoEntity(nome, cpf, crm, usuarioId);
    return medico;
}