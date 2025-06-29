import {
    getAll as getAllService,
    getById as getByIdService,
    post as postService,
    put as putService,
    destroy as destroyService,
    searchTools as searchToolsService,
    searchPaints as searchPaintsService,
    searchColors as searchColorsService,
    searchPaintsByColor as searchPaintsByColorService,
} from "../services/product.service.js";

export const getAll = async (req, res) => {
    try {
        const productos = await getAllService();
        return res.status(200).json({
            message: "Todos los productos obtenidos",
            payload: productos,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "Falta el id del producto" });
        }

        const producto = await getByIdService(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({
            message: "Producto obtenido",
            payload: producto,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const post = async (req, res) => {
    try {
        const {
            activo,
            nombre,
            descripcion,
            precio,
            img,
            color_material,
            tipo,
        } = req.body;
        if (
            activo === undefined ||
            !nombre ||
            descripcion === undefined ||
            !precio ||
            !img ||
            !color_material ||
            !tipo
        ) {
            return res.status(400).json({
                message:
                    "Faltan campos obligatorios: activo, nombre, descripcion, precio, img, color_material, tipo",
            });
        }

        const producto = await postService(req.body);
        return res.status(200).json({
            message: "Producto creado",
            payload: producto,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const put = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "Falta el id del producto" });
        }

        const {
            activo,
            nombre,
            descripcion,
            precio,
            img,
            color_material,
            tipo,
        } = req.body;

        const [filasAfectadas] = await putService(id, req.body);
        if (filasAfectadas === 0) {
            return res.status(404).json({
                error: "Producto no encontrado / cambios no realizados",
            });
        }

        const productoActualizado = await getByIdService(id);
        return res.status(200).json({
            message: "Producto actualizado",
            payload: productoActualizado,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "Falta el id del producto" });
        }

        const producto = await destroyService(id);
        if (!producto) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({
            message: "Producto eliminado",
            payload: producto,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const searchColors = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = +limit;
        offset = +offset;
        if(!limit) limit = 10
        if(!offset) offset = 0

        const colores = await searchColorsService({ limit, offset });
        return res
            .status(200)
            .json({
                message: "Colores obtenidos",
                payload: limit,
                offset,
                ...colores,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const searchTools = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = +limit;
        offset = +offset;
        if(!limit) limit = 10
        if(!offset) offset = 0

        const herramientas = await searchToolsService({ limit, offset });
        return res
            .status(200)
            .json({
                message: "Herramientas obtenidas",
                payload: limit,
                offset,
                ...herramientas,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const searchPaints = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = +limit;
        offset = +offset;
        if(!limit) limit = 10
        if(!offset) offset = 0
        const pinturas = await searchPaintsService({ limit, offset });
        return res
            .status(200)
            .json({
                message: "Pinturas obtenidas",
                payload: limit,
                offset,
                ...pinturas,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const searchPaintsByColor = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = +limit;
        offset = +offset;
        if(!limit) limit = 10
        if(!offset) offset = 0
        const { color } = req.params;
        if (!color) {
            return res
                .status(400)
                .json({ message: "Falta el color de la pintura" });
        }
        const pinturas = await searchPaintsByColorService({
            limit,
            offset,
            color,
        });
        return res
            .status(200)
            .json({
                message: "Pinturas obtenidas",
                payload: limit,
                offset,
                ...pinturas,
            });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};
