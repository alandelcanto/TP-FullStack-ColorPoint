import { sequelize, models } from "../config/db.js";
const { Comprobante, DetalleComprobante, Producto, Usuario, Imagen } = models;
import productsData from "./products.seeddata.js";
import imagesData from "./images.seeddata.js";
import usersData from "./users.seeddata.js";

const seedDB = async () => {
    try {
        await sequelize.sync({ force: true, alter: false });
        console.log("DB sincronizada");

        Imagen.bulkCreate(imagesData);
        Producto.bulkCreate(productsData);
        Usuario.bulkCreate(usersData);
    } catch (error) {
        console.error(error);
    }

    
};

seedDB();