import {MigrationInterface, QueryRunner} from "typeorm";

export class addRolesTouser1640489226840 implements MigrationInterface {
    name = 'addRolesTouser1640489226840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "roles" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    }

}
