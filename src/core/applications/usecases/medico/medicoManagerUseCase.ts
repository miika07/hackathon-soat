import MedicoRepositoryAdapter from "../../../../infra/adapter/medico/medicoRepositoryAdapter";
import { MedicoEntity } from "../../../domain/entities/medico";
import { Medico } from "../../models/medico";

export default class MedicoManagerUseCase {
    private adapter;

    constructor(adapter: MedicoRepositoryAdapter){
        this.adapter = adapter;
    }

    async criarMedico(nome: string, email: string, cpf: string, crm: string, senha: string): Promise<Medico> {
        
        const medico: MedicoEntity = await this.adapter.buscarMedicoPorCPF(cpf);
        if (medico) {
            return null;
        }
        const medicoDB: MedicoEntity = parserMedicosDB(nome, email, cpf, crm, senha);
        const response =  await this.adapter.criarMedico(medicoDB);
        // return parserMedico(response);
        return null;
    }

    async buscarTodosMedicos(): Promise<Medico[]> {
        const response = await this.adapter.buscarTodosMedicos();
        // return parserMedicos(response);
        return response;
    }

    async buscarMedicoPorId(id: string): Promise<Medico | undefined> {
        const response = await this.adapter.buscarMedicoPorId(id);
        // return response ? parserMedico(response) : response;
        return response;
    }

    async buscarMedicoPorCPF(cpf: string): Promise<Medico | undefined> {
        const response = await this.adapter.buscarMedicoPorCPF(cpf);
        // return response ? parserMedico(response) : response;
        return response;
    }

    async atualizarMedico(cpf: string, nome: string, crm: string): Promise<Medico | undefined> {
        const medico: MedicoEntity = await this.adapter.buscarMedicoPorCPF(cpf);
        if (medico) {
            medico.nome = nome;
            medico.crm = crm;
            const response = await this.adapter.atualizarMedico(medico);
            // return parserMedico(response);
            return response
        }
        // return medico;
        return null;
    }

    async deletarMedico(id: string): Promise<boolean> {
        return this.adapter.deletarMedico(id);
    }

}
