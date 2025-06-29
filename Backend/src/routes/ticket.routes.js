import { Router } from "express";
import { post, getAll, get } from "../controllers/ticket.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", get);
router.post("/", post);


export default router;
