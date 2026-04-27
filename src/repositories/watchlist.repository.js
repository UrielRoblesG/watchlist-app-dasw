

import mongoose from "mongoose";
import { WatchlistItem } from "../models/WatchlistItem.model.js";

/**
 * Repositorio para gestionar elementos de watchlist en la base de datos MongoDB.
 * Proporciona métodos para CRUD de items asociados a usuarios específicos.
 * @class
 */
class WatchlistRepository {
    /**
     * Obtiene todos los items de watchlist de un usuario específico con paginación.
     * @async
     * @param {string} userId - ID del usuario propietario de los items.
     * @param {Object} opciones - Opciones de filtrado y paginación.
     * @param {string} [opciones.estatus] - Filtrar por estatus del item.
     * @param {string} [opciones.tipo] - Filtrar por tipo de item.
     * @param {number} [opciones.page=1] - Número de página (comienza en 1).
     * @param {number} [opciones.limit=10] - Items por página.
     * @param {String} [opciones.genero] - genero del item.
     * @returns {Promise<Object>} Objeto con items, total y metadatos de paginación.
     */
    obtenerTodosPorUsuario = async (userId, { estatus, tipo, page = 1, limit = 10, genero } = {}) => {
        const query = { userId: new mongoose.Types.ObjectId(userId) };

        console.log(query);

        if (estatus) query.estatus = estatus;
        if (tipo) query.tipo = tipo;
        if (genero)
            query.genero = {
                $regex: genero,
                $options: 'i'
            };

        const total = await WatchlistItem.countDocuments(query);
        const skip = (page - 1) * limit;
        const items = await WatchlistItem.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        console.log(items);

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    };

    /**
     * Busca un item de watchlist por su ID y el ID del usuario propietario.
     * @async
     * @param {string} id - ID del item a buscar.
     * @param {string} userId - ID del usuario propietario del item.
     * @returns {Promise<Object|null>} El item encontrado o null si no existe.
     */
    buscarPorIdyUsuario = async (id, userId) => {
        const _id = new mongoose.Types.ObjectId(id);
        const _userId = new mongoose.Types.ObjectId(userId);

        return await WatchlistItem.findOne({ _id, userId: { $in: [_userId, userId] } });
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
