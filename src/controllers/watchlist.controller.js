import watchlistService from "../services/watchlist.service.js";


/**
 * @async
 * @function obtenerTodos
 * @description Controlador para obtener todos los ítems del watchlist del usuario.
 * @param {import('express').Request} [req=request] - Objeto de solicitud Express.
 * @param {import('express').Response} [res=response] - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const obtenerTodos = async (req = request, res = response) => {
    try {
        const userId = req.headers['x-token'];
        const filtros = req.query;
        const items = await watchlistService.obtenerTodos(userId, filtros);
        res.status(200).json({ count: items.length, data: items });
    } catch (error) {
        res.status(error.status || 500).json({
            mensaje: 'Ocurrio un error en la solicitud',
            error: error.message
        });
    }
};

/**
 * @async
 * @function obtenerUno
 * @description Controlador para obtener un ítem específico del watchlist.
 * @param {import('express').Request} [req=request] - Objeto de solicitud Express.
 * @param {import('express').Response} [res=response] - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const obtenerUno = async (req = request, res = response) => {
    try {
        const userId = req.headers['x-token'];
        const { id } = req.params;
        const item = await watchlistService.obtenerUno({ id, userId });
        res.status(200).json({ data: item });
    } catch (error) {
        res.status(error.status || 500).json({
            mensaje: 'Ocurrio un error en la solicitud',
            error: error.message
        });
    }
};

/**
 * @async
 * @function crear
 * @description Controlador para crear un nuevo ítem en el watchlist.
 * @param {import('express').Request} [req=request] - Objeto de solicitud Express.
 * @param {import('express').Response} [res=response] - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const crear = async (req = request, res = response) => {
    try {
        const userId = req.headers['x-token'];
        const data = req.body;
        const item = await watchlistService.crear(userId, data);
        res.status(201).json({ message: 'Título agregado a la watchlist.', data: item });
    } catch (error) {
        res.status(error.status || 500).json({
            mensaje: 'Ocurrio un error en la solicitud',
            error: error.message
        });
    }
};

/**
 * @async
 * @function actualizar
 * @description Controlador para actualizar un ítem del watchlist.
 * @param {import('express').Request} [req=request] - Objeto de solicitud Express.
 * @param {import('express').Response} [res=response] - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const actualizar = async (req = request, res = response) => {
    try {
        const userId = req.headers['x-token'];
        const { id } = req.params;
        const cambios = req.body;
        const item = await watchlistService.actualizar(id, userId, cambios);
        res.status(200).json({ message: 'Título actualizado correctamente.', data: item });
    } catch (error) {
        res.status(error.status || 500).json({
            mensaje: 'Ocurrio un error en la solicitud',
            error: error.message
        });
    }
};

/**
 * @async
 * @function eliminar
 * @description Controlador para eliminar un ítem del watchlist.
 * @param {import('express').Request} [req=request] - Objeto de solicitud Express.
 * @param {import('express').Response} [res=response] - Objeto de respuesta Express.
 * @returns {Promise<void>}
 */
const eliminar = async (req = request, res = response) => {
    try {
        const userId = req.headers['x-token'];
        const { id } = req.params;
        await watchlistService.eliminar(id, userId);
        res.status(200).json({ message: 'Título eliminado correctamente.' });
    } catch (error) {
        res.status(error.status || 500).json({
            mensaje: 'Ocurrio un error en la solicitud',
            error: error.message
        });
    }
};

export { obtenerTodos, obtenerUno, crear, actualizar, eliminar };
