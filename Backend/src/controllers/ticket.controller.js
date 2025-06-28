import { post as postService } from "../services/ticket.service.js";
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
        return res.status(500).json({ error: error.message });
    }
};
