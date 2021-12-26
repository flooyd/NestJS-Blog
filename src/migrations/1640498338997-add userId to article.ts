import {MigrationInterface, QueryRunner} from "typeorm";

export class addUserIdToArticle1640498338997 implements MigrationInterface {
    name = 'addUserIdToArticle1640498338997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "userId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "userId"`);
    }

}
