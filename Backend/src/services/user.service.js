import { models } from "../config/db.js";
const { Usuario } = models;

export const getAll = async () => {
    return await Usuario.findAll();
};
export const getById = async (id) => {
    return await Usuario.findByPk(id);
};
export const getByNombre = async (username) => {
    return await Usuario.findOne({ where: { username } });
};
export const post = async (usuario) => {
    return await Usuario.create(usuario);
};
export const destroy = async (id) => {
    return await Usuario.destroy({ where: { id } });
};
export const put = async (id, usuario) => {
    return await Usuario.update(usuario, { where: { id } });
};
