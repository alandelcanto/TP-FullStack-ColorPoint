import express from "express";
import { publicPath } from "./utils/paths.js";
import productosAPIRoutes from "./routes/productosAPIRoutes.js";
import productosAdminRoutes from "./routes/productosAdminRoutes.js";
import usuariosRoutes from "./routes/usuarioRoutes.js";
import comprobantesAPIRoutes from "./routes/comprobantesAPIRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import envs from "./config/envs.js";

const app = express();

// settings
app.set("PORT", envs.port || 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// routes
app.use("/admin/", authMiddleware, productosAdminRoutes);
app.use("/", usuariosRoutes);
app.use("/api/", productosAPIRoutes);
app.use("/api/comprobantes", comprobantesAPIRoutes);

// listen
app.listen(app.get("PORT"), () => {
    console.log(`Server ejecutando en puerto ${app.get("PORT")}`);
});
