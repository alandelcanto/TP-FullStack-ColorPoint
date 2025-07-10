import bcrypt from "bcrypt";
import {
    getByNombre as getByNombreService,
    post as postService,
} from "../services/user.service.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Faltan campos obligatorios: username, password",
            });
        }

        const usuario = await getByNombreService(username);
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        return res.status(200).json({
            message: "Inicio de sesión exitoso"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Faltan campos obligatorios: username, password",
            });
        }

        const usuario = await getByNombreService(username);
        if (usuario) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await postService({
            username,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            payload: {
                id: nuevoUsuario.id,
                username: nuevoUsuario.username,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error interno del servidor",
            error: error.message,
        });
    }
};
