import ProductoController from "../controllers/productoAPI.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", ProductoController.getAll);
router.get("/:id", ProductoController.getById);
router.post("/", ProductoController.post);
router.put("/:id", ProductoController.put);
router.delete("/:id", ProductoController.delete);

export default router;