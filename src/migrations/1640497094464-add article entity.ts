import {MigrationInterface, QueryRunner} from "typeorm";

export class addArticleEntity1640497094464 implements MigrationInterface {
    name = 'addArticleEntity1640497094464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "tags" character varying NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
