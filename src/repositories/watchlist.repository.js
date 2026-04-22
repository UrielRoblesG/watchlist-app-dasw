

import { WatchlistItem } from "../models/WatchlistItem.model.js";

/**
 * Repositorio para gestionar elementos de watchlist en la base de datos MongoDB.
 * Proporciona métodos para CRUD de items asociados a usuarios específicos.
 * @class
 */
class WatchlistRepository {
    /**
     * Obtiene todos los items de watchlist de un usuario específico.
     * @async
     * @param {string} userId - ID del usuario propietario de los items.
     * @param {Object} filtros - Filtros opcionales para refinar la búsqueda.
     * @param {string} [filtros.estatus] - Filtrar por estatus del item.
     * @param {string} [filtros.tipo] - Filtrar por tipo de item.
     * @returns {Promise<Array>} Array de items que coinciden con los criterios.
     */
    obtenerTodosPorUsuario = async (userId, { estatus, tipo } = {}) => {
        const query = { userId };

        if (estatus) query.estatus = estatus;
        if (tipo) query.tipo = tipo;

        return await WatchlistItem.find(query).sort({ createdAt: -1 });
    };

    /**
     * Busca un item de watchlist por su ID y el ID del usuario propietario.
     * @async
     * @param {string} id - ID del item a buscar.
     * @param {string} userId - ID del usuario propietario del item.
     * @returns {Promise<Object|null>} El item encontrado o null si no existe.
     */
    buscarPorIdyUsuario = async (id, userId) => {
        return await WatchlistItem.findOne({ _id: id, userId });
    };

    /**
     * Guarda un nuevo item en la watchlist.
     * @async
     * @param {Object} item - Item a guardar.
     * @returns {Promise<Object>} El item guardado.
     */
    guardar = async (item) => {
        const nuevoItem = new WatchlistItem(item);
        return await nuevoItem.save();
    };

    /**
     * Actualiza un item existente en la watchlist.
     * @async
     * @param {string} id - ID del item a actualizar.
     * @param {string} userId - ID del usuario propietario del item.
     * @param {Object} cambios - Objeto con los campos a actualizar.
     * @returns {Promise<Object|null>} El item actualizado o null si no se encontró.
     */
    actualizar = async (id, userId, cambios) => {
        return await WatchlistItem.findOneAndUpdate(
            { _id: id, userId },
            cambios,
            { new: true, runValidators: true }
        );
    };

    /**
     * Elimina un item de la watchlist.
     * @async
     * @param {string} id - ID del item a eliminar.
     * @param {string} userId - ID del usuario propietario del item.
     * @returns {Promise<boolean|null>} True si se eliminó, null si no se encontró.
     */
    eliminar = async (id, userId) => {
        const resultado = await WatchlistItem.findOneAndDelete({ _id: id, userId });
        return resultado ? true : null;
    };
}

export default new WatchlistRepository();
