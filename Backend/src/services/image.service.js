import { models } from "../config/db.js";
const { Imagen } = models;

export const getAll = async () => {
    return await Imagen.findAll();
};

export const getById = async (id) => {
    return await Imagen.findByPk(id);
};

export const post = async (imagen) => {
    return await Imagen.create(imagen);
};

export const put = async (id, imagen) => {
    return await Imagen.update(imagen, { where: { id } });
};

export const destroy = async (id) => {
    return await Imagen.destroy({ where: { id } });
};