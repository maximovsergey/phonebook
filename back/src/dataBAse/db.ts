import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: "mydbtest",
    dialect: "mysql",
    username: "root",
    password: "root",
    host: "127.0.0.1",
    modelPaths: [__dirname + "/models/*.ts"],
})
