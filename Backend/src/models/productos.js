import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Productos extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    activo: {
      type: DataTypes.TINYINT,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    marca: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    color_material: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('pintura','herramienta'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'productos',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
