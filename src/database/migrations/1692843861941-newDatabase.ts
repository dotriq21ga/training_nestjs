import { MigrationInterface, QueryRunner } from "typeorm";

export class NewDatabase1692843861941 implements MigrationInterface {
    name = 'NewDatabase1692843861941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "isGranted" boolean NOT NULL DEFAULT true, "roleId" integer, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "displayName" character varying NOT NULL, "description" character varying NOT NULL, "normalizedName" character varying NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "roleId" integer, "emailAddress" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_eea9ba2f6e1bb8cb89c4e672f62" UNIQUE ("emailAddress"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_user" ("id" SERIAL NOT NULL, "projectId" integer, "userId" integer, "type" integer NOT NULL, CONSTRAINT "PK_1cf56b10b23971cfd07e4fc6126" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."project_projecttype_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "project" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" character varying NOT NULL, "status" integer NOT NULL, "timeStart" character varying NOT NULL, "timeEnd" character varying NOT NULL, "note" character varying NOT NULL, "customerId" integer, "projectType" "public"."project_projecttype_enum" NOT NULL DEFAULT '0', "isAllUserBelongTo" boolean NOT NULL, CONSTRAINT "UQ_dedfea394088ed136ddadeee89c" UNIQUE ("name"), CONSTRAINT "UQ_b58774a8460d69d09c888158ab1" UNIQUE ("code"), CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "permission" ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_user" ADD CONSTRAINT "FK_8d75193a81f827ba8d58575e637" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_user" ADD CONSTRAINT "FK_be4e7ad73afd703f94b8866eb6b" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_b76640329fa79f0b0e9d031c35b"`);
        await queryRunner.query(`ALTER TABLE "project_user" DROP CONSTRAINT "FK_be4e7ad73afd703f94b8866eb6b"`);
        await queryRunner.query(`ALTER TABLE "project_user" DROP CONSTRAINT "FK_8d75193a81f827ba8d58575e637"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "permission" DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TYPE "public"."project_projecttype_enum"`);
        await queryRunner.query(`DROP TABLE "project_user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
