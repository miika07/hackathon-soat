import { Repository } from "typeorm";
import { AgendaMedicoRepositoryInterface } from "../../../core/applications/ports/agendaMedicoRepository";
import { AgendaMedicoEntity } from "../../../core/domain/entities/agendaMedico";

export default class AgendaMedicoRepositoryAdapter implements AgendaMedicoRepositoryInterface {

    private agendaRepository: Repository<AgendaMedicoEntity>;

    constructor(agendaRepository: Repository<AgendaMedicoEntity>) {
        this.agendaRepository = agendaRepository;
    }

    async criarAgendaMedico(agenda: AgendaMedicoEntity): Promise<AgendaMedicoEntity> {
        return await this.agendaRepository.save(agenda);
    }

    async buscarTodosAgendaMedicos(): Promise<AgendaMedicoEntity[]> {
        return await this.agendaRepository.find();
    }

    async buscarAgendasDeUmMedico(id: string): Promise<AgendaMedicoEntity[]> {
        return await this.agendaRepository.find({where: {medico: {id: id}}});
    }

    async buscarAgendasDeUmPaciente(id: string): Promise<AgendaMedicoEntity[]> {
        return await this.agendaRepository.find({where: {paciente: {id: id}}});
    }

    async buscarAgendaMedicoPorId(id: string): Promise<AgendaMedicoEntity | undefined> {
        return await this.agendaRepository.findOne({ where: { id: id } });
    }

    async buscarAgendaPorDataHoraIdMedico(data: string, horario: string, idMedico: string): Promise<AgendaMedicoEntity | undefined> {
        return await this.agendaRepository.findOne({
            where: {
                data: data,
                horario: horario,
                medico: {
                    id: idMedico
                }
            }
        });
    }

    async atualizarAgendaMedico(agenda: AgendaMedicoEntity): Promise<AgendaMedicoEntity> {
        return await this.agendaRepository.save(agenda);
    }

    async deletarAgendaMedico(id: string): Promise<boolean> {
        const result = await this.agendaRepository.delete(id);
        return result.affected !== undefined && result.affected > 0;
    }

}
