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
import { parserAgendaMedico, parserAgendaMedicoDB } from '../../adapters/agendaMedico';
import AgendaMedicoRepositoryAdapter from '../../../../infra/adapter/agenda/AgendaMedicoRepositoryAdapter';

export default class AgendaManagerUseCase {
    private mailgun;
    private mg;
    private pacienteAdapter;
    private medicoAdapter;
    private agendaAdapter;

    constructor(
        pacienteAdapter: PacienteRepositoryAdapter,
        medicoAdapter: MedicoRepositoryAdapter,
        agendaAdapter: AgendaMedicoRepositoryAdapter
    ) {
        this.mailgun = new Mailgun(formData);
        this.mg = this.mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || 'addf5f22a5e692f6dc30995cf156998b-1b5736a5-7fd3b4ce' });
    }

    async pacienteAgendaConsulta(agenda: AgendaMedico, pacienteId: string): Promise<AgendaMedico> {
        try {
            const agendaMedico: AgendaMedicoEntity = await this.agendaAdapter.buscarAgendaMedico(agenda.id);

            if (!agendaMedico) {
                throw new Error("Agenda não existe");
            }

            //Verificar se a agenda não tem nenhum paciênte nela e se ela existe
            if (!agendaMedico.paciente) {
                const pacienteDB = await this.pacienteAdapter.getById(pacienteId);
                let paciente = parserPaciente(pacienteDB);
                let medico = parserMedico(agendaMedico.medico);
                let agenda = parserAgendaMedico(agendaMedico);

                const response = await this.medicoAtualizaAgenda(agenda.id, agenda.data, agenda.horario, paciente.id);

                this.enviarEmailAgendamento(medico, paciente, agenda);

                return response;
            }

        } catch (error) {
            throw new Error("Erro ao agendar consulta.");
        }
    }

    async medicoAdicionaAgenda(): Promise<AgendaMedico> {

        const medico: MedicoEntity = await this.medicoAdapter.buscarMedicoPorCPF(cpf);
        if (medico) {
            throw new Error('Médico já cadastrado com esse CPF.');
        }

        const usuarioExistente = await this.userAdapter.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado com esse email.');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCripto = await bcrypt.hash(senha, salt);

        const usuarioDB: UsuarioEntity = parserUsuarioDB(email, senhaCripto, PerfilEnum.MEDICO);

        const novoUsuario = await this.userAdapter.criarUsuario(usuarioDB);

        const medicoDB: MedicoEntity = parserMedicosDB(nome, cpf, crm, novoUsuario);

        const response = await this.adapter.criarMedico(medicoDB);

        return parserMedico(response);


    }

    async medicoAtualizaAgenda(agendaId: string, data: string, horario: string, pacienteId?: string): Promise<AgendaMedico> {

        try {
            let agendaMedico: AgendaMedicoEntity = await this.agendaAdapter.buscarAgendaMedico(agendaId);

            if (agendaMedico && horariosDeAgenda.includes(horario)) {
                const medicoId = agendaMedico.medico.id;
                const agendaExiste = await this.agendaAdapter.buscarAgendaPorDataHora(medicoId, data, horario);

                if ((!agendaExiste)) {
                    agendaMedico.data = data;
                    agendaMedico.horario = horario;
                }

                if (pacienteId) {
                    let paciente = await this.pacienteAdapter.buscarPacientePorId(pacienteId);
                    agendaMedico.paciente = paciente;
                }

            } else {
                throw new Error("Data e Hora incompatíveis.")
            }

            const response = await this.agendaAdapter.atualizarAgenda(agendaMedico);

            return parserAgendaMedico(response);

        } catch (error) {
            throw new Error("Erro ao atualizar agenda.");
        }
    }

    async enviarEmailAgendamento(medico: Medico, paciente: Paciente, agenda: AgendaMedico): Promise<void> {

        try {
            const result = await this.mg.messages.create('sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org', {
                from: "Health&Med <mailgun@sandbox60d9f86a189b47f48ec0f48c2c9dedcd.mailgun.org>",
                to: [medico.email],
                subject: "Health&Med - Nova consulta agendada",
                text: "Testing some Mailgun awesomeness!",
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

        } catch {
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
}