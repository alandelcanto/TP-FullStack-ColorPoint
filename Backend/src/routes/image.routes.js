import { Router } from "express";
import {
    getAll,
    getById,
    post,
    destroy,
} from "../controllers/image.controller.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);

router.post("/", post);
router.delete("/:id", destroy);

export default router;
