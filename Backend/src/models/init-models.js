import _sequelize from "sequelize";
const { DataTypes } = _sequelize;
import ComprobanteDef from  "./ticket.model.js";
import DetalleComprobanteDef from  "./ticket-item.model.js";
import ProductoDef from  "./product.model.js";
import UsuarioDef from  "./user.model.js";
import ImagenDef from  "./image.model.js";

export default function initModels(sequelize) {
  const Producto = ProductoDef(sequelize, DataTypes);
  const Comprobante = ComprobanteDef(sequelize, DataTypes);
  const DetalleComprobante = DetalleComprobanteDef(sequelize, DataTypes);
  const Usuario = UsuarioDef(sequelize, DataTypes);
  const Imagen = ImagenDef(sequelize, DataTypes);


  DetalleComprobante.belongsTo(Comprobante, { as: "comprobante", foreignKey: "comprobante_id", onDelete: 'CASCADE'});
  DetalleComprobante.belongsTo(Producto, { as: "producto", foreignKey: "producto_id", onDelete: 'CASCADE'});
  Comprobante.hasMany(DetalleComprobante, { as: "detallecomprobantes", foreignKey: "comprobante_id"});
  Producto.hasMany(DetalleComprobante, { as: "detallecomprobantes", foreignKey: "producto_id"});
  Imagen.hasMany(Producto, { as: "producto", foreignKey: "img"});

  return {
    Comprobante,
    DetalleComprobante,
    Producto,
    Usuario,
    Imagen
  };
}
