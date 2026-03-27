import { crearWatchlistItem } from "../models/WatchlistItem.model.js";

import watchlistRepository from "../repositories/watchlist.repository.js";

/**
 * @class WatchlistService
 * @classdesc Servicio que maneja las operaciones CRUD para watchlist de usuarios.
 */
class WatchlistService {
    /**
     * Obtiene todos los ítems del watchlist de un usuario, opcionalmente filtrados.
     * @async
     * @param {string} [userId=''] - ID del usuario.
     * @param {Object} filtros - Objeto con criterios de filtrado.
     * @returns {Promise<Array>} Promesa que resuelve con los ítems filtrados.
     */
    obtenerTodos = async (userId = '', filtros) => {
        return await watchlistRepository.obtenerTodosPorUsuario(userId, filtros);
    };

    /**
     * Busca un ítem por su ID y el ID del usuario.
     * @async
     * @param {Object} params - Parámetros de búsqueda.
     * @param {string} params.id - ID del ítem.
     * @param {string} params.userId - ID del usuario.
     * @returns {Promise<Object>} Promesa que resuelve con el ítem encontrado.
     * @throws {Error} Error con status 404 si el ítem no se encuentra.
     */
    obtenerUno = async ({ id, userId }) => {
        const item = await watchlistRepository.buscarPorIdyUsuario(id, userId);
        if (!item) {
            const error = new Error("Título no encontrado.");
            error.status = 404;
            throw error;
        }
        return item;
    };

    /**
     * Crea un nuevo ítem en el watchlist del usuario.
     * @async
     * @param {number} userId - ID del usuario.
     * @param {Object} data - Datos del nuevo ítem.
     * @returns {Promise<Object>} Promesa que resuelve con el ítem creado.
     */
    crear = async (userId, data) => {

        const newItem = crearWatchlistItem({ userId, ...data });
        console.log(typeof newItem.id);

        return watchlistRepository.guardar(newItem);
    };

    /**
     * Actualiza un ítem existente en el watchlist.
     * @async
     * @param {string} id - ID del ítem a actualizar.
     * @param {string} userId - ID del usuario.
     * @param {Object} cambios - Campos a actualizar.
     * @returns {Promise<Object>} Promesa que resuelve con el ítem actualizado.
     * @throws {Error} Error con status 404 si el ítem no se encuentra.
     */
    actualizar = async (id, userId, cambios) => {
        console.log(`Id pelicula:${id}| userID: ${userId} `);

        const itemActualizado = await watchlistRepository.actualizar(id, userId, cambios);
        if (!itemActualizado) {
            const error = new Error("Título no encontrado.");
            error.status = 404;
            throw error;
        }
        return itemActualizado;
    };

    /**
     * Elimina un ítem del watchlist.
     * @async
     * @param {string} id - ID del ítem a eliminar.
     * @param {string} userId - ID del usuario.
     * @returns {Promise<boolean>} Promesa que resuelve con true si se eliminó correctamente.
     * @throws {Error} Error con status 404 si el ítem no se encuentra.
     */
    eliminar = async (id, userId) => {
        const resultado = await watchlistRepository.eliminar(id, userId);
        if (resultado === null) {
            const error = new Error("Título no encontrado.");
            error.status = 404;
            throw error;
        }
        return resultado;
    };
}

export default new WatchlistService();
