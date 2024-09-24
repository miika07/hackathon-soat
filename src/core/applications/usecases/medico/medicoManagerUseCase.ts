import { Transaction } from "typeorm";
import MedicoRepositoryAdapter from "../../../../infra/adapter/medico/medicoRepositoryAdapter";
import UsuarioRepositoryAdapter from "../../../../infra/adapter/usuario/usuarioRepositoryAdapter";
import { MedicoEntity } from "../../../domain/entities/medico";
import { UsuarioEntity } from "../../../domain/entities/usuario";
import { parserUsuarioDB } from "../../adapters/usuario";
import { Medico } from "../../models/medico";
import { PerfilEnum } from "../../models/usuario";
import * as bcrypt from 'bcrypt';
import { parserMedico, parserMedicos, parserMedicosDB } from "../../adapters/medico";

export default class MedicoManagerUseCase {
    private adapter;
    private userAdapter;

    constructor(adapter: MedicoRepositoryAdapter, userAdapter: UsuarioRepositoryAdapter) {
        this.adapter = adapter;
        this.userAdapter = userAdapter;
    }

    async criarMedico(nome: string, email: string, cpf: string, crm: string, senha: string): Promise<Medico> {

        const medico: MedicoEntity = await this.adapter.buscarMedicoPorCPF(cpf);
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

        const novoUsuario = await this.adapter.criarUsuario(usuarioDB);

        const medicoDB: MedicoEntity = parserMedicosDB(nome, cpf, crm, novoUsuario.id);

        const response = await this.adapter.criarMedico(medicoDB);

        return parserMedico(response);
    }

    async buscarTodosMedicos(): Promise<Medico[]> {
        const response = await this.adapter.buscarTodosMedicos();
        return parserMedicos(response);
    }

    async buscarMedicoPorId(id: string): Promise<Medico | undefined> {
        const response = await this.adapter.buscarMedicoPorId(id);
        return response ? parserMedico(response) : response;
    }

    async buscarMedicoPorCPF(cpf: string): Promise<Medico | undefined> {
        const response = await this.adapter.buscarMedicoPorCPF(cpf);
        return response ? parserMedico(response) : response;
    }

    async atualizarMedico(cpf: string, nome: string, crm: string): Promise<Medico | undefined> {
        const medico: MedicoEntity = await this.adapter.buscarMedicoPorCPF(cpf);
        if (medico) {
            medico.nome = nome;
            medico.crm = crm;
            medico.cpf = cpf;
            const response = await this.adapter.atualizarMedico(medico);
            return parserMedico(response);
        }
        return null;
    }

    async deletarMedico(id: string): Promise<boolean> {
        return this.adapter.deletarMedico(id);
    }

}
