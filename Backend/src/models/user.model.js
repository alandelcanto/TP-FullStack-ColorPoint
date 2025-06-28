export default (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: "username_UNIQUE",
        },
        password: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
    });
};
