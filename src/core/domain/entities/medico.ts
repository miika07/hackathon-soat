import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UsuarioEntity } from './usuario';
import { AgendaMedicoEntity } from './agendaMedico';

@Entity({ name: 'medicos' })
@Index('idx_medico_id', ['id'], { unique: true })
@Index('idx_medico_cpf', ['cpf'], { unique: true })
export class MedicoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    crm: string;

    @OneToOne(() => UsuarioEntity, usuario => usuario.id, { eager: true })
    @JoinColumn({ name: 'idUsuario' })
    usuario: string;

    @OneToMany(() => AgendaMedicoEntity, agenda => agenda.medico, { cascade: true })
    agendas: AgendaMedicoEntity[];

    constructor(nome: string = '', cpf: string = '', crm: string = '', usuario: string = '') {
        this.id = uuidv4();
        this.nome = nome;
        this.cpf = cpf;
        this.crm = crm;
        this.usuario = usuario;
    }
}
