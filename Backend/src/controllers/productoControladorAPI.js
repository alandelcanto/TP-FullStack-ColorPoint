import productosServicio from '../services/productosServicio.js';

const getProductos = (req, res) => {
    try {
        const productos = productosServicio.getProductos();
        res.json(productos); 
    } catch (error) {
        res.status(404).json({error: error.message});
    }
    
}

const postProducto = (req, res) => {
    try {
        const producto = productosServicio.crearProducto(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export default {
    getProductos,
    postProducto
}