import { DataSource } from "typeorm";
import config from "../../../config/environment.config";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: config.dbTest.host,
    port: 3306,
    username: config.dbTest.user,
    password: config.dbTest.password,
    database: config.dbTest.dbName,
    synchronize: false,
    logging: true,
    entities: ["./src/core/domain/entities/*.ts"],
    subscribers: [],
    migrations: ["./src/infra/data/database/migrations/*.ts"]
})