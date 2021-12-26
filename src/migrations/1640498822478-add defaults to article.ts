import {MigrationInterface, QueryRunner} from "typeorm";

export class addDefaultsToArticle1640498822478 implements MigrationInterface {
    name = 'addDefaultsToArticle1640498822478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096" UNIQUE ("title")`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tags" SET DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "tags" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "content" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "UQ_3c28437db9b5137136e1f6d6096"`);
    }

}
