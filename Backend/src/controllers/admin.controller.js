import envs from "../config/envs.js";
import {
    searchPaints,
    searchTools,
    post,
    getById,
} from "../services/product.service.js";
import {
    getById as getByIdImage,
    post as postImage,
} from "../services/image.service.js";
import { getAll } from "../services/ticket.service.js";

export const login = async (req, res) => {
    res.render("login.ejs", {
        NOMBRE1: "Alan del Canto",
        NOMBRE2: "Shirley Antezana",
        URL_FRONT: envs.front_url,
    });
};

export const dashboard = async (req, res) => {
    let { limit, offset, tipo } = req.query;
    limit = +limit;
    offset = +offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;
    if (!tipo) tipo = "pintura";

    const productos =
        tipo === "pintura"
            ? await searchPaints({ limit, offset }, "", true)
            : await searchTools({ limit, offset }, "", true);

    for (const producto of productos.rows) {
        const image = await getByIdImage(producto.img);
        producto.img = image.url;
    }

    res.render("dashboard.ejs", {
        NOMBRE1: "Alan del Canto",
        NOMBRE2: "Shirley Antezana",
        URL_FRONT: envs.front_url,
        productos: productos.rows,
        cantidad: productos.count,
        query: req.query,
    });
};

export const pantallaCrearProducto = async (req, res) => {
    res.render("crearProducto.ejs", {
        NOMBRE1: "Alan del Canto",
        NOMBRE2: "Shirley Antezana",
        URL_FRONT: envs.front_url,
    });
};

export const crearProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion, color_material, tipo } = req.body;
        const imgFile = req.file;

        const fullPath = imgFile.path;

        const publicPath = fullPath.replace(/^.*public[\\/]/, "");

        const imagen = await postImage({ url: publicPath });

        post({
            activo: true,
            nombre,
            precio,
            descripcion,
            color_material,
            tipo,
            img: imagen.id,
        });

        res.redirect("/dashboard");
    } catch (error) {
        console.log(error);
    }
};

export const pantallaEditarProducto = async (req, res) => {
    const producto = await getById(req.params.id);
    const imagen = await getByIdImage(producto.img);

    res.render("editarProducto", {
        producto,
        imagen: imagen.url,
        URL_FRONT: envs.front_url,
        NOMBRE1: "Alan del Canto",
        NOMBRE2: "Shirley Antezana",
    });
};

export const editarProducto = async (req, res) => {
    try {
        const producto = await getById(req.params.id);

        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        producto.descripcion = req.body.descripcion;
        producto.color_material = req.body.color_material;
        producto.tipo = req.body.tipo;

        if (req.file) {
            const imgPath = req.file.path.replace(/^.*public[\\/]/, "");
            
            const img = await postImage({ url: imgPath });
            producto.img = img.id;

        }

        await producto.save();

        res.redirect("/dashboard");
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).send("Error al actualizar el producto");
    }
};

export const verComprobantes = async (req, res) => {
    let { limit, offset } = req.query;
    limit = +limit;
    offset = +offset;
    if (!limit) limit = 10;
    if (!offset) offset = 0;

    const tickets = await getAll({limit, offset});

    res.render("verComprobantes.ejs", {
        NOMBRE1: "Alan del Canto",
        NOMBRE2: "Shirley Antezana",
        URL_FRONT: envs.front_url,
        tickets: tickets.rows,
        cantidad: tickets.count,
        query: req.query
    });
};