import { MigrationInterface, QueryRunner } from 'typeorm';

export class NameRefator1713753134983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "name" TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" RENAME COLUMN "title" TO "name"`,
    );
  }
}
