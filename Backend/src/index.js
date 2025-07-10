import express from "express";
import { publicPath, viewsPath } from "./utils/paths.js";
import rutasProductos from "./routes/product.routes.js";
import rutasUsuarios from "./routes/user.routes.js";
import rutasComprobantes from "./routes/ticket.routes.js";
import rutasImagenes from "./routes/image.routes.js";
import rutasAdmin from "./routes/admin.routes.js";
import envs from "./config/envs.js";
import { sequelize } from "./config/db.js";
import cors from "cors";
import methodOverride from "method-override";

const app = express();

// settings
app.set("PORT", envs.port || 3000);
app.set("view engine", "ejs");
app.set("views", viewsPath);

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
app.use(methodOverride('_method'));

const allowedOrigins = ["http://localhost:5500", "127.0.0.1:5500", "http://localhost:3000", "127.0.0.1:3000"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
        },
    })
);

// routes
app.use("/api/usuarios", rutasUsuarios);
app.use("/api/comprobantes", rutasComprobantes);
app.use("/api/productos", rutasProductos);
app.use("/api/imagenes", rutasImagenes);

app.use("/", rutasAdmin);

// listen
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server ejecutando en puerto ${app.get("PORT")}`);
});
