import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MedicoEntity } from './medico';
import { PacienteEntity } from './paciente';

@Entity({ name: 'agendas' })
export class AgendaMedicoEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'date' })
    data: string;

    @Column({ type: 'time' })
    horario: string;

    @ManyToOne(() => MedicoEntity, medico => medico.agendas, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'idMedico' })
    medico: MedicoEntity;

    @ManyToOne(() => PacienteEntity, paciente => paciente.agendas, { eager: true, onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'idPaciente' })
    paciente: PacienteEntity | null;
    
    constructor(data: string = '', horario: string = '', medico?: MedicoEntity, paciente?: PacienteEntity | null) {
        this.id = uuidv4();
        this.data = data;
        this.horario = horario;
        this.medico = medico || null;
        this.paciente = paciente || null;
    }
}