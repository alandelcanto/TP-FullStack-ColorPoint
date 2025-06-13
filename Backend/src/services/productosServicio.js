import { Producto } from "../models/producto.js";

let productos = [];

const getProductos = () => {
    return productos;
};

const crearProducto = (data) => {
    const { id, nombre, precio, imagen, categoria, activo } = data;
    const nuevoProducto = new Producto(
        id,
        nombre,
        precio,
        imagen,
        categoria,
        activo
    );

    if (!id || !nombre || !precio || !imagen || !categoria || !activo) {
        throw new Error("Faltan campos obligatorios");
    }

    productos.push(nuevoProducto);
    return nuevoProducto;
};

export default {
    getProductos,
    crearProducto,
};
