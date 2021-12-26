import {MigrationInterface, QueryRunner} from "typeorm";

export class changeRolesDefaultValue1640489390197 implements MigrationInterface {
    name = 'changeRolesDefaultValue1640489390197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT`);
    }

}
