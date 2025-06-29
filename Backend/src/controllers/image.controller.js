import {
    post as postService,
    getAll as getAllService,
    getById as getByIdService,
    destroy as destroyService,
} from "../services/image.service.js";

export const getAll = async (req, res) => {
    try {
        const imagenes = await getAllService();
        return res.status(200).json({
            message: "Todas las imagenes obtenidas",
            payload: imagenes,
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
        const { url } = req.body;
        if (!url) {
            return res
                .status(400)
                .json({ message: "Falta la url de la imagen" });
        }

        const imagen = await postService(req.body);
        return res
            .status(201)
            .json({ message: "Imagen creada", payload: imagen });
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
                .json({ message: "Falta el id de la imagen" });
        }

        const encontrada = await getByIdService(id);
        if (!encontrada) {
            return res.status(404).json({ message: "Imagen no encontrada" });
        }

        const imagen = await destroyService(id);
        return res
            .status(200)
            .json({ message: "Imagen eliminada", payload: imagen });
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
                .json({ message: "Falta el id de la imagen" });
        }

        const imagen = await getByIdService(id);
        return res
            .status(200)
            .json({ message: "Imagen obtenida", payload: imagen });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};
