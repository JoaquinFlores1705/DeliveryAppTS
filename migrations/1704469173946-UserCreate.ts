import { MigrationInterface, QueryRunner } from "typeorm";

export class UserCreate1704469173946 implements MigrationInterface {
    name = 'UserCreate1704469173946'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(90) NOT NULL, \`lastname\` varchar(90) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(90) NOT NULL, \`image\` varchar(255) NULL, \`password\` varchar(90) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
