import UsuarioController from "../controllers/usuarioController.js";
import { Router } from "express";

const router = Router();

router.post("/register", UsuarioController.register);
router.post("/login", UsuarioController.login);

export default router;