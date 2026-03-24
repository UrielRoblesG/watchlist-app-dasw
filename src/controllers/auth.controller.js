
import { request, response } from "express";
import authService from "../services/auth.service.js";



const registro = async (req = request, res = response) => {
    try {
        const usuario = await authService.registrarUsuario(req.body);

        res.status(201).json({ mensaje: 'Usuario creado', usuario: usuario });
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: 'Ocurrio un error en la solicitud.', error: error.messaje });
    }
};


export {
    registro
}