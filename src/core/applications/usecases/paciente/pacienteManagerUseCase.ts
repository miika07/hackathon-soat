import PacienteRepositoryAdapter from "../../../../infra/adapter/paciente/pacienteRepositoryAdapter";
import UsuarioRepositoryAdapter from "../../../../infra/adapter/usuario/usuarioRepositoryAdapter";
import { PacienteEntity } from "../../../domain/entities/paciente";
import { UsuarioEntity } from "../../../domain/entities/usuario";
import { parserPaciente, parserPacientes, parserPacientesDB } from "../../adapters/paciente";
import { parserUsuarioDB } from "../../adapters/usuario";
import { Paciente } from "../../models/paciente";
import { PerfilEnum } from "../../models/usuario";
import * as bcrypt from 'bcrypt';

export default class PacienteManagerUseCase {
    private adapter;
    private userAdapter;

    constructor(adapter: PacienteRepositoryAdapter, userAdapter: UsuarioRepositoryAdapter) {
        this.adapter = adapter;
        this.userAdapter = userAdapter;
    }

    async criarPaciente(nome: string, email: string, cpf: string, crm: string, senha: string): Promise<Paciente> {

        const paciente: PacienteEntity = await this.adapter.buscarPacientePorCPF(cpf);
        if (paciente) {
            throw new Error('Paciente já cadastrado com esse CPF.');
        }

        const usuarioExistente = await this.userAdapter.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            throw new Error('Usuário já cadastrado com esse email.');
        }

        const salt = await bcrypt.genSalt(10);
        const senhaCripto = await bcrypt.hash(senha, salt);

        const usuarioDB: UsuarioEntity = parserUsuarioDB(email, senhaCripto, PerfilEnum.PACIENTE);

        const novoUsuario = await this.userAdapter.criarUsuario(usuarioDB);

        const pacienteDB: PacienteEntity = parserPacientesDB(nome, cpf, novoUsuario.id);

        const response = await this.adapter.criarPaciente(pacienteDB);

        return parserPaciente(response);
    }

    async buscarTodosPacientes(): Promise<Paciente[]> {
        const response = await this.adapter.buscarTodosPacientes();
        return parserPacientes(response);
    }

    async buscarPacientePorId(id: string): Promise<Paciente | undefined> {
        const response = await this.adapter.buscarPacientePorId(id);
        return response ? parserPaciente(response) : response;
    }

    async buscarPacientePorCPF(cpf: string): Promise<Paciente | undefined> {
        const response = await this.adapter.buscarPacientePorCPF(cpf);
        return response ? parserPaciente(response) : response;
    }

    async atualizarPaciente(cpf: string, nome: string, crm: string): Promise<Paciente | undefined> {
        const paciente: PacienteEntity = await this.adapter.buscarPacientePorCPF(cpf);
        if (paciente) {
            paciente.nome = nome;
            const response = await this.adapter.atualizarPaciente(paciente);
            return parserPaciente(response);
        }
        return null;
    }

    async deletarPaciente(id: string): Promise<boolean> {
        return this.adapter.deletarPaciente(id);
    }

}
