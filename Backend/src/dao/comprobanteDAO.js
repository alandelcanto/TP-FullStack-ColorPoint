import { sequelize, models} from "../config/db.js";
const {Comprobante, DetalleComprobante} = models;

const ComprobanteDAO = {
    post: async (comprobanteData, detalleComprobante) => {
        return await sequelize.transaction(async (t) => {
            const comprobante = await Comprobante.create(comprobanteData, { transaction: t });
            for (const detalle of detalleComprobante) {
                await DetalleComprobante.create({ ...detalle, comprobante_id: comprobante.id }, { transaction: t });
            }
            return comprobante;
        })
    }
}

export default ComprobanteDAO;