export default (sequelize, DataTypes) => {
    return sequelize.define("Imagen", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    });
};
