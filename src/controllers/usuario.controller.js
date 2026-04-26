import { request, response } from "express";
import usuarioService from "../services/usuario.service.js";

/**
 * Crea un nuevo usuario en el sistema.
 * @param {request} req - Objeto de petición con nombre, email y password en req.body.
 * @param {response} res - Objeto de respuesta de Express.
 */
const crear = async (req = request, res = response) => {
    try {
        const usuario = await usuarioService.crear(req.body);

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            usuario: usuario
        });
    } catch (error) {
        console.error('Error en crear:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al crear el usuario',
            error: error.message
        });
    }
};

/**
 * Obtiene todos los usuarios registrados en el sistema.
 * Solo administradores deberían tener acceso a esta ruta.
 * @param {request} req - Objeto de petición de Express.
 * @param {response} res - Objeto de respuesta de Express.
 */
const obtenerTodos = async (req = request, res = response) => {
    try {
        const usuarios = await usuarioService.obtenerTodos();

        res.status(200).json({
            mensaje: 'Usuarios obtenidos exitosamente',
            total: usuarios.length,
            usuarios: usuarios
        });
    } catch (error) {
        console.error('Error en obtenerTodos:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al obtener los usuarios',
            error: error.message
        });
    }
};

/**
 * Obtiene un usuario específico por su ID.
 * @param {request} req - Objeto de petición con el ID en req.params.
 * @param {response} res - Objeto de respuesta de Express.
 */
const obtenerPorId = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID del usuario es requerido',
                error: 'ID parameter missing'
            });
        }

        const usuario = await usuarioService.obtenerPorId(id);

        res.status(200).json({
            mensaje: 'Usuario obtenido exitosamente',
            usuario: usuario
        });
    } catch (error) {
        console.error('Error en obtenerPorId:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al obtener el usuario',
            error: error.message
        });
    }
};

/**
 * Obtiene el perfil del usuario autenticado.
 * Utiliza el userId del token JWT decodificado en req.user.
 * @param {request} req - Objeto de petición con información del usuario autenticado.
 * @param {response} res - Objeto de respuesta de Express.
 */
const obtenerMiPerfil = async (req = request, res = response) => {
    try {
        const userId = req.user.userId || req.user.id;

        if (!userId) {
            return res.status(401).json({
                mensaje: 'No autorizado',
                error: 'User ID not found in token'
            });
        }

        const usuario = await usuarioService.obtenerPorId(userId);

        res.status(200).json({
            mensaje: 'Perfil obtenido exitosamente',
            usuario: usuario
        });
    } catch (error) {
        console.error('Error en obtenerMiPerfil:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al obtener el perfil',
            error: error.message
        });
    }
};

/**
 * Actualiza los datos de un usuario específico.
 * Solo permite actualizar nombre y email.
 * @param {request} req - Objeto de petición con ID en params y datos en body.
 * @param {response} res - Objeto de respuesta de Express.
 */
const actualizar = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const datos = req.body;

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID del usuario es requerido',
                error: 'ID parameter missing'
            });
        }

        const usuarioActualizado = await usuarioService.actualizar(id, datos);

        res.status(200).json({
            mensaje: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error('Error en actualizar:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al actualizar el usuario',
            error: error.message
        });
    }
};

/**
 * Actualiza el perfil del usuario autenticado.
 * Solo permite actualizar nombre y email del usuario actual.
 * @param {request} req - Objeto de petición con datos en body.
 * @param {response} res - Objeto de respuesta de Express.
 */
const actualizarMiPerfil = async (req = request, res = response) => {
    try {
        const userId = req.user.userId || req.user.id;
        const datos = req.body;

        if (!userId) {
            return res.status(401).json({
                mensaje: 'No autorizado',
                error: 'User ID not found in token'
            });
        }

        const usuarioActualizado = await usuarioService.actualizar(userId, datos);

        res.status(200).json({
            mensaje: 'Perfil actualizado exitosamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.error('Error en actualizarMiPerfil:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al actualizar el perfil',
            error: error.message
        });
    }
};

/**
 * Elimina un usuario específico por su ID.
 * @param {request} req - Objeto de petición con el ID en req.params.
 * @param {response} res - Objeto de respuesta de Express.
 */
const eliminar = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                mensaje: 'El ID del usuario es requerido',
                error: 'ID parameter missing'
            });
        }

        const resultado = await usuarioService.eliminar(id);

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error en eliminar:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al eliminar el usuario',
            error: error.message
        });
    }
};

/**
 * Obtiene estadísticas generales de usuarios.
 * @param {request} req - Objeto de petición de Express.
 * @param {response} res - Objeto de respuesta de Express.
 */
const obtenerEstadisticas = async (req = request, res = response) => {
    try {
        const total = await usuarioService.obtenerTotal();

        res.status(200).json({
            mensaje: 'Estadísticas obtenidas exitosamente',
            estadisticas: {
                totalUsuarios: total
            }
        });
    } catch (error) {
        console.error('Error en obtenerEstadisticas:', error.message);

        res.status(error.status || 500).json({
            mensaje: 'Ocurrió un error al obtener las estadísticas',
            error: error.message
        });
    }
};

export {
    crear,
    obtenerTodos,
    obtenerPorId,
    obtenerMiPerfil,
    actualizar,
    actualizarMiPerfil,
    eliminar,
    obtenerEstadisticas
};
