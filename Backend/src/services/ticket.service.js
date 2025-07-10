import { sequelize, models } from "../config/db.js";
const { Comprobante, DetalleComprobante } = models;

export const get = async (id) => {
    return sequelize.transaction(async (t) => {
        return await Comprobante.findByPk(id, {
        include: {
            model: DetalleComprobante,
            as: "detallecomprobantes",
        },
        transaction: t,
    });
    })
};

export const getAll = async ({ limit, offset }) => {
    return sequelize.transaction(async (t) => {
        return await Comprobante.findAndCountAll({
            limit: limit,
            offset: offset,
        include: {
            model: DetalleComprobante,
            as: "detallecomprobantes",
            include: {
                model: models.Producto,
                as: "producto",
            },
        },
        transaction: t,
    });
    })
    
}

export const post = async (comprobanteData, detalleComprobante) => {
    return await sequelize.transaction(async (t) => {
        const comprobante = await Comprobante.create(comprobanteData, {
            transaction: t,
        });
        for (const detalle of detalleComprobante) {
            await DetalleComprobante.create(
                { ...detalle, comprobante_id: comprobante.id },
                { transaction: t }
            );
        }
        return comprobante;
    });
};
