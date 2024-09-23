import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioEntity } from './usuario';
import { AgendaMedicoEntity } from './agendaMedico';

@Entity({ name: 'pacientes' })
@Index('idx_paciente_id', ['id'], { unique: true })
@Index('idx_paciente_cpf', ['cpf'], { unique: true })
export class PacienteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @OneToOne(() => UsuarioEntity, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario: string;

    @OneToMany(() => AgendaMedicoEntity, agenda => agenda.paciente, { cascade: true })
    agendas: AgendaMedicoEntity[];

    constructor(nome: string = '', cpf: string = '', usuario: string = '') {
        this.id = uuidv4();
        this.nome = nome;
        this.cpf = cpf;
        this.usuario = usuario;
    }
}
