import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class DetalleComprobantes extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    comprobante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'comprobantes',
        key: 'id'
      }
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'productos',
        key: 'id'
      }
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    precio_unidad: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    precio_subtotal: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'detallecomprobantes',
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
      {
        name: "comprobante_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "comprobante_id" },
        ]
      },
      {
        name: "producto_id_fk_idx",
        using: "BTREE",
        fields: [
          { name: "producto_id" },
        ]
      },
    ]
  });
  }
}
