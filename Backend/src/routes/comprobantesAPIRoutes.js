import ComprobanteController from "../controllers/comprobanteAPIController.js";
import { Router } from "express";

const router = Router();

router.post("/", ComprobanteController.post);

export default router;