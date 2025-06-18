import ProductoDAO from "../dao/productoDAO.js";

const ProductoController = {
    async getAll(req, res) {
        try {
            const productos = await ProductoDAO.getAll();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const producto = await ProductoDAO.getById(req.params.id);
            if (!producto) {
                res.status(404).json({ error: "Producto no encontrado" });
                return;
            }
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async post(req, res) {
        try {
            const producto = await ProductoDAO.post(req.body);
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async put(req, res) {
        try {
            const [filasAfectadas] = await ProductoDAO.put(req.params.id, req.body);
            if (filasAfectadas === 0) {
                res.status(404).json({ error: "Producto no encontrado / cambios no realizados" });
                return;
            }
            const productoActualizado = await ProductoDAO.getById(req.params.id);
            res.status(200).json(productoActualizado);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            const producto = await ProductoDAO.delete(req.params.id);
            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default ProductoController;
