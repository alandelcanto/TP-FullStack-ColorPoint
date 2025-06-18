import jwt from "jsonwebtoken";

const SECRETO = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ error: "Token no proporcionado" });
        }
        const decoded = jwt.verify(token, SECRETO);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Token invalido" });
    }
};

export default authMiddleware;