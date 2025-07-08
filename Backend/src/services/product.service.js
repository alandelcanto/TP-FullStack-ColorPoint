import {Op} from "sequelize";
import { models } from "../config/db.js";
const { Producto } = models;

export const getAll = async () => {
    return await Producto.findAll();
};

export const getById = async (id) => {
    return await Producto.findByPk(id);
};

export const post = async (producto) => {
    return await Producto.create(producto);
};

export const put = async (id, producto) => {
    return await Producto.update(producto, { where: { id } });
};

export const destroy = async (id) => {
    return await Producto.destroy({ where: { id } });
};

export const searchPaints = async ({limit = 10, offset = 0}, search) => {
    return await Producto.findAndCountAll(
        {
            limit: +limit,
            offset: +offset,
            where: { tipo: "pintura" , activo : true},
            [Op.like]: `%${search}%`,
        }
    );
}

export const searchPaintsByColor = async ({limit = 10, offset = 0}, color, search) => {
    return await Producto.findAndCountAll(
        {
            limit: +limit,
            offset: +offset,
            where: { color_material: color, tipo: "pintura", activo : true},
            [Op.like]: `%${search}%`,
        }
    );
}

export const searchColors = async () => {
    return await Producto.findAll(
        {
            attributes: ["color_material"],
            group: ["color_material"],
            where: { tipo: "pintura", activo : true},
        }
    );
}

export const searchTools = async ({limit = 10, offset = 0}, search) => {
    return await Producto.findAndCountAll(
        {
            limit: +limit,
            offset: +offset,
            where: { tipo: "herramienta", activo : true},
            [Op.like]: `%${search}%`,
        }
    );
}