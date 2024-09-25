import { Repository } from "typeorm";
import { PacienteEntity } from "../../../core/domain/entities/paciente";
import { PacienteRepositoryInterface } from "../../../core/applications/ports/pacienteRepository";
import { UsuarioEntity } from "../../../core/domain/entities/usuario";

export default class PacienteRepositoryAdapter implements PacienteRepositoryInterface {

    private pacienteRepository: Repository<PacienteEntity>;

    constructor(pacienteRepository: Repository<PacienteEntity>) {
        this.pacienteRepository = pacienteRepository;
    }

    async criarPaciente(paciente: PacienteEntity): Promise<PacienteEntity> {
        return await this.pacienteRepository.save(paciente);
    }

    async buscarTodosPacientes(): Promise<PacienteEntity[]> {
        return await this.pacienteRepository.find();
    }

    async buscarPacientePorId(id: string): Promise<PacienteEntity | undefined> {
        return await this.pacienteRepository.findOne({ where: { id: id } });
    }

    async buscarPacientePorCPF(cpf: string): Promise<PacienteEntity | undefined> {
        return await this.pacienteRepository.findOne({ where: { cpf: cpf } });
    }

    async buscarPacientePoUsuarioId(usuario: UsuarioEntity): Promise<PacienteEntity | undefined> {
        return await this.pacienteRepository.findOne({ where: { usuario: usuario } });
    }

    async atualizarPaciente(paciente: PacienteEntity): Promise<PacienteEntity> {
       return await this.pacienteRepository.save(paciente);
    }

    async deletarPaciente(id: string): Promise<boolean> {
        const result = await this.pacienteRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}
