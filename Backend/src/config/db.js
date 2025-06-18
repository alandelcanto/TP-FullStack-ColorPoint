import Sequelize from "sequelize";
import initModels from "../models/init-models.js";

const sequelize = new Sequelize('colorpoint', 'colorpointadmin', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

const models = initModels(sequelize);

export { sequelize, models };