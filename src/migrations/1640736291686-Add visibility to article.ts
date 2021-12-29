import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVisibilityToArticle1640736291686 implements MigrationInterface {
    name = 'AddVisibilityToArticle1640736291686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD "visibility" character varying NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP COLUMN "visibility"`);
    }

}
