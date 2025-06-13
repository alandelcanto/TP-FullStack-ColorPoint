import productoControladorAPI from "../controllers/productoControladorAPI.js";
import { Router } from "express";

const router = Router();

router.get("/productos", productoControladorAPI.getProductos);

router.post("/productos", productoControladorAPI.postProducto);

export default router;