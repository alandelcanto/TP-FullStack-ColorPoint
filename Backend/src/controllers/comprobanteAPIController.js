import ComprobanteDAO from "../dao/comprobanteDAO.js";

const ComprobanteController = {
    post: async (req, res) => {
        try {
            const {nombre_cliente, fecha, total, detalleComprobante} = req.body;
            const comprobante = await ComprobanteDAO.post({nombre_cliente, fecha, total}, detalleComprobante);
            res.status(201).json(comprobante);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default ComprobanteController;