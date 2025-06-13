import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("Productos Admin GET HOME");
});

export default router;