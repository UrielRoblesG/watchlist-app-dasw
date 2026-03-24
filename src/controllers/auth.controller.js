
import { request, response } from "express";
import authService from "../services/auth.service.js";



/**
 * Controlador para manejar la petición HTTP de registro de nuevos usuarios.
 * Se encarga de la comunicación entre el cliente (HTTP) y la lógica de negocio (Service).
 * * @param {request} req - Objeto de petición de Express (contiene el body con los datos).
 * @param {response} res - Objeto de respuesta de Express.
 */
const registro = async (req = request, res = response) => {
    try {
        // Pasamos el cuerpo de la petición (req.body) directamente al servicio.
        // El 'await' es obligatorio porque la base de datos es asíncrona.
        const usuario = await authService.registrarUsuario(req.body);

        // Usamos el código 201 (Created) que es el estándar semántico 
        // correcto para cuando se crea un nuevo recurso.
        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: usuario
        });

    } catch (error) {
        /**
         * Si el servicio lanza un error (ej. "El usuario ya existe"), 
         * intentamos usar el código de estado que venga en el error (400, 409, etc.).
         * Si no tiene uno, por defecto usamos 500 (Error del servidor).
         */
        console.error(`Error en el controlador de registro:`, error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error en la solicitud.',
            error: error.message
        });
    }
};

const ingresar = async (req = request, res = response) => {
    try {
        const respuesta = await authService.intentarLogin(req.body);
        res.status(200).json({ mensaje: 'Operacion exitosa.', respuesta: respuesta });
    } catch (error) {
        res.status(error.status || 500).json({ mensaje: 'Ocurrio un error en la solicitud.', error: error.message });
    }
}



export {
    registro,
    ingresar
}