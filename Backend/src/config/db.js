import Sequelize from "sequelize";
import initModels from "../models/init-models.js";
import envs from "./envs.js";

const { database, user, password, host, port } = envs.db_config;

const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql',
    port: port,
    logging: false
});

try {
    await sequelize.authenticate();
    console.log('Conectado a la DB');
} catch (err) {
    console.error('Conexion con la DB fallida', err);
}

const models = initModels(sequelize);
export {sequelize, models};