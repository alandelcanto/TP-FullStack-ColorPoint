export default (sequelize, DataTypes) => {
    return sequelize.define("Comprobante", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        nombre_cliente: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
    });
};
