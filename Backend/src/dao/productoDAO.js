import { models } from "../config/db.js";
const { Producto } = models;

const ProductoDAO = {
    async getAll() {
        return await Producto.findAll();
    },

    async getById(id) {
        return await Producto.findByPk(id);
    },

    async post(producto) {
        return await Producto.create(producto);
    },

    async put(id, producto) {
        return await Producto.update(producto, { where: { id } });
    },

    async delete(id) {
        return await Producto.destroy({ where: { id } });
    }
};

export default ProductoDAO;