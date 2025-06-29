import {
    post as postService,
    get as getService,
    getAll as getAllService,
} from "../services/ticket.service.js";

export const get = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
                .status(400)
                .json({ message: "Falta el id del comprobante" });
        }
        const comprobante = await getService(id);
        if (!comprobante) {
            return res
                .status(404)
                .json({ message: "Comprobante no encontrado" });
        }
        return res
            .status(200)
            .json({ message: "Comprobante obtenido", payload: comprobante });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const comprobantes = await getAllService();
        return res
            .status(200)
            .json({ message: "Todos los comprobantes obtenidos", payload: comprobantes });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
}

export const post = async (req, res) => {
    try {
        const { nombre_cliente, fecha, total, detalleComprobante } = req.body;
        if (
            !nombre_cliente ||
            !fecha ||
            !total ||
            !detalleComprobante ||
            detalleComprobante.length === 0
        ) {
            return res.status(400).json({
                message:
                    "Faltan campos obligatorios: nombre_cliente, fecha, total, detalleComprobante",
            });
        }
        const comprobante = await postService(
            { nombre_cliente, fecha, total },
            detalleComprobante
        );
        return res
            .status(201)
            .json({ message: "Comprobante creado", payload: comprobante });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};
