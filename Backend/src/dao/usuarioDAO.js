import {models} from "../config/db.js";
const {Usuario} = models;

const UsuarioDAO = {
    getAll: async () => {
        return await Usuario.findAll();
    },
    getById: async (id) => {
        return await Usuario.findByPk(id);
    },
    getByNombre: async (username) => {
        return await Usuario.findOne({where: {username}});
    },
    post: async (usuario) => {
        return await Usuario.create(usuario);
    },
    delete: async (id) => {
        return await Usuario.destroy({where: {id}});
    },
    put: async (id, usuario) => {
        return await Usuario.update(usuario, {where: {id}});
    }
}

export default UsuarioDAO;