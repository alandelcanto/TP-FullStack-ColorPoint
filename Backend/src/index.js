import express from "express";
import { publicPath } from "./utils/paths.js";
import productosAPIRoutes from "./routes/product.routes.js";
import usuariosRoutes from "./routes/usuarioRoutes.js";
import comprobantesAPIRoutes from "./routes/ticket.routes.js";
import envs from "./config/envs.js";
import { sequelize } from "./config/db.js";
import cors from "cors";

const app = express();

// settings
app.set("PORT", envs.port || 3000);

const initializeConnection = async () => {
    try {
        await sequelize.sync({alter: true});
        console.log("DB sincronizada");
    } catch (error) {
        console.error(error);
    }
};

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use(
    cors({
        origin: "http://127.0.0.1:5500",
    })
);

// routes
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/comprobantes", comprobantesAPIRoutes);
app.use("/api/productos", productosAPIRoutes);

// listen
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server ejecutando en puerto ${app.get("PORT")}`);
});
