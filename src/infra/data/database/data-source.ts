import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    //  host: "tech-db.chgoi2cggwr3.us-east-1.rds.amazonaws.com",
    // host: "mysql-service",
    host: "localhost",
    port: 3306,
    username: "fiap",
    password: "password",
    database: "tech-challenge-fiap",
    synchronize: true,
    logging: true,
    entities: ["./src/core/domain/entities/*.ts"],
    subscribers: [],
    migrations: ["./src/infra/data/database/migrations/*.ts"]
})