import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _comprobantes from  "./comprobantes.js";
import _detallecomprobantes from  "./detallecomprobantes.js";
import _productos from  "./productos.js";
import _usuarios from  "./usuarios.js";

export default function initModels(sequelize) {
  const Comprobante = _comprobantes.init(sequelize, DataTypes);
  const DetalleComprobante = _detallecomprobantes.init(sequelize, DataTypes);
  const Producto = _productos.init(sequelize, DataTypes);
  const Usuario = _usuarios.init(sequelize, DataTypes);

  DetalleComprobante.belongsTo(Comprobante, { as: "comprobante", foreignKey: "comprobante_id"});
  Comprobante.hasMany(DetalleComprobante, { as: "detallecomprobantes", foreignKey: "comprobante_id"});
  DetalleComprobante.belongsTo(Producto, { as: "producto", foreignKey: "producto_id"});
  Producto.hasMany(DetalleComprobante, { as: "detallecomprobantes", foreignKey: "producto_id"});

  return {
    Comprobante,
    DetalleComprobante,
    Producto,
    Usuario
  };
}
