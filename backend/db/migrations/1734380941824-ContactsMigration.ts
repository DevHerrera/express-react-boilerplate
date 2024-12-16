import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContactsMigration1734380941824 implements MigrationInterface {
  name = 'ContactsMigration1734380941824';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" SERIAL NOT NULL, "photoUrl" character varying, "fullName" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying, CONSTRAINT "PK_2cbbe00f59ab6b3bb5b8d19f989" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact"`);
  }
}
