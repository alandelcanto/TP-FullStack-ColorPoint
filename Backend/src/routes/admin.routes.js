import { Router } from "express";
import {
    login,
    dashboard,
    crearProducto,
    pantallaCrearProducto,
    pantallaEditarProducto,
    editarProducto,
    verComprobantes,
} from "../controllers/admin.controller.js";
import { uploadMulter } from "../middlewares/multer.js";

const router = Router();

router.get("/login", login);
router.get("/dashboard", dashboard);
router.get("/crear-producto", pantallaCrearProducto);
router.post("/crear-producto", uploadMulter.single("img"), crearProducto);
router.get("/editar-producto/:id", pantallaEditarProducto);
router.put("/editar-producto/:id", uploadMulter.single("img"), editarProducto);
router.get("/comprobantes", verComprobantes);

export default router;
