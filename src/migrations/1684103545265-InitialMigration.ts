import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1684103545265 implements MigrationInterface {
    name = 'InitialMigration1684103545265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "deletedAt" SET DEFAULT now()`);
    }

}
