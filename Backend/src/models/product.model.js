export default (sequelize, DataTypes) => {
    return sequelize.define("Producto", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        img: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color_material: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM("pintura", "herramienta"),
            allowNull: false,
        },
    });
};
