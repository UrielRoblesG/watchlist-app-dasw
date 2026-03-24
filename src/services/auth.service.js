import usuarioRepository from "../repositories/usuario.repository.js";

import { crearUsuario } from '../models/User.model.js'

class AuthService {



    registrarUsuario = async ({ nombre, email, password }) => {
        const existe = await usuarioRepository.obtenerPorEmail(email);

        console
        if (existe == null || existe.length == 0) {
            const error = new Error('El correo ya está registrado.');
            error.status = 409;
            throw error;
        }

        const nuevoUsuario = crearUsuario({ nombre, email, password });

        const guardado = await usuarioRepository.guardar(nuevoUsuario);

        return this._sanitizar(guardado);
    }

    _generarToken = ({ id, email, rol }) => `${id}|${email}|${rol}`;

    _sanitizar = (usuario) => {
        const { password, ...resto } = usuario;
        return resto;
    }
}



const authService = new AuthService();

export default authService;