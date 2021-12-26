import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultsToArticleTitle1640498893452 implements MigrationInterface {
    name = 'addDefaultsToArticleTitle1640498893452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
    }

}
