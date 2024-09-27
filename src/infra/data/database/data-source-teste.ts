// import { DataSource } from "typeorm";

// export const AppDataSourceTest = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "fiap-test",
//     password: "password",
//     database: "tech-challenge-fiap-test",
//     logging: false,
//     entities: ["src/core/domain/entities/*.ts"],
//     migrations: ["src/infra/data/database/migrations/*.ts"],
//     synchronize: true,
//     dropSchema: true,
//     extra: {
//     connectionLimit: 5,
//     allowPublicKeyRetrieval: true
//   }
// })

  
import { DataSource } from "typeorm";
import config from "../../../config/environment.config";

console.log(config.dbTest.user);
export const AppDataSourceTest = new DataSource({
    type: "mysql",
    host: config.dbTest.host,
    port: 3306,
    username: config.dbTest.user,
    password: config.dbTest.password,
    database: config.dbTest.name,
    logging: false,
    entities: ["src/core/domain/entities/*.ts"],
    migrations: ["src/infra/data/database/migrations/*.ts"],
    synchronize: true,
    dropSchema: true,
    extra: {
    connectionLimit: 5
  }
})

  