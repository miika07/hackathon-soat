import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1727060969980 implements MigrationInterface {
    name = 'Database1727060969980'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`perfil\` varchar(255) NOT NULL, UNIQUE INDEX \`idx_usuario_email\` (\`email\`), UNIQUE INDEX \`idx_usuario_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`medicos\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`crm\` varchar(255) NOT NULL, \`idUsuario\` varchar(36) NULL, UNIQUE INDEX \`idx_medico_cpf\` (\`cpf\`), UNIQUE INDEX \`idx_medico_id\` (\`id\`), UNIQUE INDEX \`REL_e18caa85140640e70e46b4cafc\` (\`idUsuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`pacientes\` (\`id\` varchar(36) NOT NULL, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`idUsuario\` varchar(36) NULL, UNIQUE INDEX \`idx_paciente_cpf\` (\`cpf\`), UNIQUE INDEX \`idx_paciente_id\` (\`id\`), UNIQUE INDEX \`REL_472cda6bdd870dd3de83848d3a\` (\`idUsuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`agendas\` (\`id\` varchar(36) NOT NULL, \`data\` date NOT NULL, \`horario\` time NOT NULL, \`idMedico\` varchar(36) NULL, \`idPaciente\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`medicos\` ADD CONSTRAINT \`FK_e18caa85140640e70e46b4cafce\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`pacientes\` ADD CONSTRAINT \`FK_472cda6bdd870dd3de83848d3a7\` FOREIGN KEY (\`idUsuario\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD CONSTRAINT \`FK_745440184d49c5b0b7214d059ed\` FOREIGN KEY (\`idMedico\`) REFERENCES \`medicos\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD CONSTRAINT \`FK_0322bcc765a2fd3708487538b2a\` FOREIGN KEY (\`idPaciente\`) REFERENCES \`pacientes\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP FOREIGN KEY \`FK_0322bcc765a2fd3708487538b2a\``);
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP FOREIGN KEY \`FK_745440184d49c5b0b7214d059ed\``);
        await queryRunner.query(`ALTER TABLE \`pacientes\` DROP FOREIGN KEY \`FK_472cda6bdd870dd3de83848d3a7\``);
        await queryRunner.query(`ALTER TABLE \`medicos\` DROP FOREIGN KEY \`FK_e18caa85140640e70e46b4cafce\``);
        await queryRunner.query(`DROP TABLE \`agendas\``);
        await queryRunner.query(`DROP INDEX \`REL_472cda6bdd870dd3de83848d3a\` ON \`pacientes\``);
        await queryRunner.query(`DROP INDEX \`idx_paciente_id\` ON \`pacientes\``);
        await queryRunner.query(`DROP INDEX \`idx_paciente_cpf\` ON \`pacientes\``);
        await queryRunner.query(`DROP TABLE \`pacientes\``);
        await queryRunner.query(`DROP INDEX \`REL_e18caa85140640e70e46b4cafc\` ON \`medicos\``);
        await queryRunner.query(`DROP INDEX \`idx_medico_id\` ON \`medicos\``);
        await queryRunner.query(`DROP INDEX \`idx_medico_cpf\` ON \`medicos\``);
        await queryRunner.query(`DROP TABLE \`medicos\``);
        await queryRunner.query(`DROP INDEX \`idx_usuario_id\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`idx_usuario_email\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
