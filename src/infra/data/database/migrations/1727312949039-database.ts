import { MigrationInterface, QueryRunner } from "typeorm";

export class Database1727312949039 implements MigrationInterface {
    name = 'Database1727312949039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD \`data\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP COLUMN \`horario\``);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD \`horario\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP COLUMN \`horario\``);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD \`horario\` time NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`agendas\` DROP COLUMN \`data\``);
        await queryRunner.query(`ALTER TABLE \`agendas\` ADD \`data\` date NOT NULL`);
    }

}
