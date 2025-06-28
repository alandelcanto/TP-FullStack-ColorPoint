import { Router } from "express";
import {
    getAll,
    getById,
    post,
    put,
    destroy,
    searchTools,
    searchPaints,
    searchColors,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/search/tools", searchTools);
router.get("/search/paints/", searchPaints);
router.get("/search/paints/:color", searchPaints);
router.get("/search/colors", searchColors);

router.get("/", getAll);
router.get("/:id", getById);

router.post("/", post);
router.put("/:id", put);
router.delete("/:id", destroy);

export default router;
