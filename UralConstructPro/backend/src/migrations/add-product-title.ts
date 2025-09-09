import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddProductTitle1700000000000 implements MigrationInterface {
  name = 'AddProductTitle1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'applications',
      new TableColumn({
        name: 'productTitle',
        type: 'varchar',
        length: '200',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('applications', 'productTitle');
  }
}
