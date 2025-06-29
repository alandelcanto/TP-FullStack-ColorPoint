import express from "express";
import { publicPath } from "./utils/paths.js";
import rutasProductos from "./routes/product.routes.js";
import rutasUsuarios from "./routes/user.routes.js";
import rutasComprobantes from "./routes/ticket.routes.js";
import rutasImagenes from "./routes/image.routes.js";
import envs from "./config/envs.js";
import { sequelize } from "./config/db.js";
import cors from "cors";

const app = express();

// settings
app.set("PORT", envs.port || 3000);

const initializeConnection = async () => {
    try {
        await sequelize.sync({ force: false, alter: false });
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
app.use("/api/usuarios", rutasUsuarios);
app.use("/api/comprobantes", rutasComprobantes);
app.use("/api/productos", rutasProductos);
app.use("/api/imagenes", rutasImagenes);

// listen
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server ejecutando en puerto ${app.get("PORT")}`);
});
