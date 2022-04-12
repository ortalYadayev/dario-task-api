import {MigrationInterface, QueryRunner} from "typeorm";

export class tables1649758135524 implements MigrationInterface {
    name = 'tables1649758135524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`countries\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`country_code\` varchar(255) NOT NULL,
                \`country_title\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`user_name\` varchar(255) NOT NULL,
                \`user_active\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`send_log\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`log_message\` varchar(255) NOT NULL,
                \`log_success\` tinyint NOT NULL,
                \`userId\` int NULL,
                \`numId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`numbers\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`num_number\` varchar(255) NOT NULL,
                \`countryId\` int NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`send_log\`
            ADD CONSTRAINT \`FK_bb65f55ae70a8c17fb1dc128b8d\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`send_log\`
            ADD CONSTRAINT \`FK_46c483468e96b71b3bfbc8a05a8\` FOREIGN KEY (\`numId\`) REFERENCES \`numbers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`numbers\`
            ADD CONSTRAINT \`FK_a2e2fb989c682f8057ff4e13956\` FOREIGN KEY (\`countryId\`) REFERENCES \`countries\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`numbers\` DROP FOREIGN KEY \`FK_a2e2fb989c682f8057ff4e13956\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`send_log\` DROP FOREIGN KEY \`FK_46c483468e96b71b3bfbc8a05a8\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`send_log\` DROP FOREIGN KEY \`FK_bb65f55ae70a8c17fb1dc128b8d\`
        `);
        await queryRunner.query(`
            DROP TABLE \`numbers\`
        `);
        await queryRunner.query(`
            DROP TABLE \`send_log\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`countries\`
        `);
    }

}
