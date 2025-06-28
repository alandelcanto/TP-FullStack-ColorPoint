import { Router } from "express";
import { post } from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", post);

export default router;
