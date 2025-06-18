import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UsuarioDAO from "../dao/usuarioDAO.js";

const SECRETO = process.env.JWT_SECRET;

const UsuarioController = {
    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const usuario = await UsuarioDAO.getByNombre(username);

            if (!usuario) {
                return res.status(404).json({ error: "Usuario no encontrado" });
            }

            const passwordValido = await bcrypt.compare(password, usuario.password);

            if (!passwordValido) {
                return res.status(401).json({ error: "Contrasen?a incorrecta" });
            }

            const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },


    register: async (req, res) => {
        const { username, password } = req.body;

        try {
            const usuario = await UsuarioDAO.getByNombre(username);
            
            if (usuario) {
                return res.status(400).json({ error: "El usuario ya existe" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const nuevoUsuario = await UsuarioDAO.post({ username, password: hashedPassword });

            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default UsuarioController;