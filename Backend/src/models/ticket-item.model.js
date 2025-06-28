export default (sequelize, DataTypes) => {
    return sequelize.define("DetalleComprobante", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        comprobante_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "comprobantes",
                key: "id",
            },
        },
        producto_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "productos",
                key: "id",
            },
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        precio_unidad: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        precio_subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });
};
