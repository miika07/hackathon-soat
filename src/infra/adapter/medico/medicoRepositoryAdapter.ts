import { Repository } from "typeorm";
import { MedicoEntity } from "../../../core/domain/entities/medico";
import { MedicoRepositoryInterface } from "../../../core/applications/ports/medicoRepository";
import { UsuarioEntity } from "../../../core/domain/entities/usuario";

export default class MedicoRepositoryAdapter implements MedicoRepositoryInterface {

    private medicoRepository: Repository<MedicoEntity>;

    constructor(medicoRepository: Repository<MedicoEntity>) {
        this.medicoRepository = medicoRepository;
    }

    async criarMedico(medico: MedicoEntity): Promise<MedicoEntity> {
        return await this.medicoRepository.save(medico);
    }

    async buscarTodosMedicos(): Promise<MedicoEntity[]> {
        return await this.medicoRepository.find();
    }

    async buscarMedicoPorId(id: string): Promise<MedicoEntity | undefined> {
        return await this.medicoRepository.findOne({ where: { id: id } });
    }

    async buscarMedicoPorCPF(cpf: string): Promise<MedicoEntity | undefined> {
        return await this.medicoRepository.findOne({ where: { cpf: cpf } });
    }

    async buscarMedicoPorCRM(crm: string): Promise<MedicoEntity | undefined> {
        return await this.medicoRepository.findOne({ where: { crm: crm } });
    }

    async buscarMedicoPoUsuarioId(usuario: UsuarioEntity): Promise<MedicoEntity | undefined> {
        return await this.medicoRepository.findOne({ where: { usuario: usuario } });
    }

    async atualizarMedico(medico: MedicoEntity): Promise<MedicoEntity> {
       return await this.medicoRepository.save(medico);
    }

    async deletarMedico(id: string): Promise<boolean> {
        const result = await this.medicoRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}
