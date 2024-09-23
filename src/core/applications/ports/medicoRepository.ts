import { MedicoEntity } from "../../domain/entities/medico";

export interface MedicoRepositoryInterface {
    criarMedico(medico: MedicoEntity): Promise<MedicoEntity>;
    buscarTodosMedicos(): Promise<MedicoEntity[]>;
    buscarMedicoPorId(id: string): Promise<MedicoEntity | undefined>;
    buscarMedicoPorCPF(cpf: string): Promise<MedicoEntity | undefined>; 
    buscarMedicoPorCRM(crm: string): Promise<MedicoEntity | undefined>; 
    atualizarMedico(medico: MedicoEntity): Promise<MedicoEntity>;
    deletarMedico(id: string): Promise<boolean>;
}