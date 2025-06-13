import express from "express";
import { publicPath } from "./utils/paths.js";
import productosAPI from "./routes/productosAPI.route.js";
import productosAdmin from "./routes/productosAdmin.route.js";

const app = express();

// settings
app.set("PORT", 3000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// routes
app.use("/", productosAdmin);
app.use("/api/", productosAPI);

// listen
app.listen(app.get("PORT"), () => {
    console.log(`Server ejecutando en puerto ${app.get("PORT")}`);
});
