import { Entity, PrimaryGeneratedColumn, Column, Index, OneToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity({ name: 'usuarios' })
@Index('idx_usuario_id', ['id'], { unique: true })
@Index('idx_usuario_email', ['email'], { unique: true })
export class UsuarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    perfil: string;

    constructor(email: string = '', senha: string = '', perfil: string = '') {
        this.id = uuidv4();
        this.email = email;
        this.senha = senha;
        this.perfil = perfil;
    }
}
