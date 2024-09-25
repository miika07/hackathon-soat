import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { Medico } from "../../models/medico";
import { Paciente } from "../../models/paciente";
import { AgendaMedico, HoraEnum, horariosDeAgenda } from '../../models/agendaMedico';
import { AgendaMedicoEntity } from '../../../domain/entities/agendaMedico';
import MedicoRepositoryAdapter from '../../../../infra/adapter/medico/medicoRepositoryAdapter';
import PacienteRepositoryAdapter from '../../../../infra/adapter/paciente/pacienteRepositoryAdapter';
import { parserMedico } from '../../adapters/medico';
import { parserPaciente } from '../../adapters/paciente';
import { parserAgendaMedico, parserAgendaMedicoDB, parserAgendasMedicos } from '../../adapters/agendaMedico';
import AgendaMedicoRepositoryAdapter from '../../../../infra/adapter/agenda/AgendaMedicoRepositoryAdapter';
import { MedicoEntity } from '../../../domain/entities/medico';
import * as jwt from 'jsonwebtoken';

export default class AgendaManagerUseCase {
    private mailgun;
    private mg;
    private pacienteAdapter: PacienteRepositoryAdapter;
    private medicoAdapter: MedicoRepositoryAdapter;
    private agendaAdapter: AgendaMedicoRepositoryAdapter;
    private jwtSecret;

    constructor(
        pacienteAdapter: PacienteRepositoryAdapter,
        medicoAdapter: MedicoRepositoryAdapter,
        agendaAdapter: AgendaMedicoRepositoryAdapter
    ) {
        this.mailgun = new Mailgun(formData);
        this.mg = this.mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'addf5f22a5e692f6dc30995cf156998b-1b5736a5-7fd3b4ce' });
        this.pacienteAdapter = pacienteAdapter;
        this.medicoAdapter = medicoAdapter;
        this.agendaAdapter = agendaAdapter;
    }

    async pacienteAgendaConsulta(agendaId: string, pacienteId: string): Promise<AgendaMedico> {
        try {
            const agendaMedico: AgendaMedicoEntity = await this.agendaAdapter.buscarAgendaMedicoPorId(agendaId);

            if (!agendaMedico) {
                throw new Error("Agenda não existe");
            }

            //Verificar se a agenda não tem nenhum paciênte nela e se ela existe
            if (!agendaMedico.paciente) {
                const pacienteDB = await this.pacienteAdapter.buscarPacientePorId(pacienteId);
                let paciente = parserPaciente(pacienteDB);
                let medico = parserMedico(agendaMedico.medico);
                let agenda = parserAgendaMedico(agendaMedico);

                const response = await this.medicoAtualizaAgenda(agenda.id, agenda.data, agenda.horario, paciente.id);

                this.enviarEmailAgendamento(medico, paciente, agenda);

                return response;
            } else {
                // throw new Error("Horário já ocupado.");
                return null;
            }

        } catch (error) {
            throw new Error("Erro ao agendar consulta.");
        }
    }

    async buscarAgendasDeUmMedico(medicoId: string): Promise<AgendaMedico[]> {
        try {
            const agendaMedico: AgendaMedicoEntity[] = await this.agendaAdapter.buscarAgendasDeUmMedico(medicoId);

            if (!agendaMedico) {
                return [];
            }
            return parserAgendasMedicos(agendaMedico); 

        } catch (error) {
            throw new Error("Erro ao buscar agendas.");
        }
    }

    async medicoAdicionaAgenda(data: string, horario: string, medicoId: string, pacienteId?: string): Promise<AgendaMedico> {

        try {
            if (!horariosDeAgenda.includes(horario)) {
                throw new Error("Hora inválida.")
            }

            if (this.validarDataFormato(data)) {
                throw new Error("Data inválida.")
            }

            const agendaExiste = await this.agendaAdapter.buscarAgendaPorDataHoraIdMedico(data, horario, medicoId);

            if (!agendaExiste) {
                let paciente = null;
                if (pacienteId) {
                    paciente = await this.pacienteAdapter.buscarPacientePorId(pacienteId);
                }

                const medico = await this.medicoAdapter.buscarMedicoPorId(medicoId);

                const novaAgenda = parserAgendaMedicoDB(data, horario, medico, paciente);

                const response = await this.agendaAdapter.criarAgendaMedico(novaAgenda);

                return parserAgendaMedico(response);

            } else {
                return null;
            }

        } catch (error) {
            console.log(error);
            throw new Error("Não foi possível cadastrar essa agenda.");
        }
    }

    async medicoAtualizaAgenda(agendaId: string, data: string, horario: string, medicoId: string, pacienteId?: string): Promise<AgendaMedico> {

        try {

            if (!horariosDeAgenda.includes(horario)) {
                throw new Error("Hora inválida.")
            }

            if (this.validarDataFormato(data)) {
                throw new Error("Data inválida.")
            }

            let agendaMedico: AgendaMedicoEntity = await this.agendaAdapter.buscarAgendaMedicoPorId(agendaId);
            if (agendaMedico && agendaMedico.medico.id == medicoId) {
                const medicoId = agendaMedico.medico.id;
                const agendaExiste = await this.agendaAdapter.buscarAgendaPorDataHoraIdMedico(data, horario, medicoId);

                if ((!agendaExiste)) {
                    agendaMedico.data = data;
                    agendaMedico.horario = horario;
                }

                if (pacienteId) {
                    let paciente = await this.pacienteAdapter.buscarPacientePorId(pacienteId);
                    agendaMedico.paciente = paciente;
                }

            } else {
                return null;
            }

            const response = await this.agendaAdapter.atualizarAgendaMedico(agendaMedico);

            return parserAgendaMedico(response);

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao atualizar agenda.");
        }
    }

    async enviarEmailAgendamento(medico: Medico, paciente: Paciente, agenda: AgendaMedico): Promise<void> {

        try {
            const result = await this.mg.messages.create('sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org', {
                from: "Health&Med <mailgun@sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org>",
                to: [medico.email],
                subject: "Health&Med - Nova consulta agendada",
                html:
                    `<html>
                        <body>
                            <p>Olá, Dr(a). <strong>${medico.nome}</strong></p>
                            <p>Você tem uma nova consulta marcada!</p>
                            <p><strong>Paciente:</strong> ${paciente.nome}</p>
                            <p><strong>Data e horário:</strong> ${agenda.data} à ${agenda.horario}</p>
                            
                        </body>
                    </html>`
            })
                .then(msg => console.log(msg))
                .catch(err => console.log(err));

        } catch (error) {
            console.log(error);
            throw new Error("Erro ao enviar email.");
        }
    }

    async enviarEmailTeste(): Promise<void> {

        try {
            const result = await this.mg.messages.create('sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org', {
                from: "Health&Med <mailgun@sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org>",
                to: ["milksgc@gmail.com"],
                subject: "Health&Med - Nova consulta agendada",
                html:
                    `<html>
                        <body>
                            <p>Olá, Dr(a). <strong>Medico</strong></p>
                            <p>Você tem uma nova consulta marcada!</p>
                            <p><strong>Paciente:</strong> Paciente</p>
                            <p><strong>Data e horário:</strong> 10/10/2024 à 00:00</p>
                        </body>
                    </html>`
            })
                .then(msg => console.log(msg))
                .catch(err => console.log(err));

        } catch {
            throw new Error("Erro ao enviar email.");
        }
    }

    validarDataFormato(data: string): boolean {
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regex.test(data)) {
            return false;
        }

        const [dia, mes, ano] = data.split('/').map(Number);
        const dataObjeto = new Date(ano, mes - 1, dia);

        if (
            dataObjeto.getFullYear() === ano &&
            dataObjeto.getMonth() === mes - 1 &&
            dataObjeto.getDate() === dia
        ) {
            return true;
        }

        return false;
    }

}
