

import jsonDb from "../db/jsonDb.js";

/**
 * Repositorio para gestionar elementos de watchlist en la base de datos JSON.
 * Proporciona métodos para CRUD de items asociados a usuarios específicos.
 * @class
 */
class WatchlistRepository {
    /**
     * Inicializa el repositorio estableciendo la colección "watchlist".
     * @constructor
     */
    constructor() {
        this._COLECCION = "watchlist";
    }

    /**
     * Obtiene todos los items de watchlist de un usuario específico.
     * @async
     * @param {number|string} userId - ID del usuario propietario de los items.
     * @param {Object} filtros - Filtros opcionales para refinar la búsqueda.
     * @param {string} [filtros.estado] - Filtrar por estado del item.
     * @param {string} [filtros.tipo] - Filtrar por tipo de item.
     * @returns {Promise<Array>} Array de items que coinciden con los criterios.
     */
    obtenerTodosPorUsuario = async (userId, { estado, tipo }) => {
        const datos = await jsonDb.leer(this._COLECCION);

        return datos.filter(item => {
            if (item.userId != userId) return false;
            if (estado && item.estado !== estado) return false;
            if (tipo && item.tipo !== tipo) return false;
            return true;
        });
    };

    /**
     * Busca un item de watchlist por su ID y el ID del usuario propietario.
     * @async
     * @param {number|string} id - ID del item a buscar.
     * @param {number|string} userId - ID del usuario propietario del item.
     * @returns {Promise<Object|null>} El item encontrado o null si no existe.
     */
    buscarPorIdyUsuario = async (id, userId) => {
        const datos = await jsonDb.leer(this._COLECCION);
        return datos.find(item => item.id == id && item.userId == userId) || null;
    };

    /**
     * Guarda un nuevo item en la watchlist.
     * @async
     * @param {Object} item - Item a guardar.
     * @returns {Promise<Object>} El item guardado.
     */
    guardar = async (item) => {
        const datos = await jsonDb.leer(this._COLECCION);
        datos.push(item);
        await jsonDb.guardar(this._COLECCION, datos);
        return item;
    };

    /**
     * Actualiza un item existente en la watchlist.
     * @async
     * @param {number|string} id - ID del item a actualizar.
     * @param {number|string} userId - ID del usuario propietario del item.
     * @param {Object} cambios - Objeto con los campos a actualizar.
     * @returns {Promise<Object|null>} El item actualizado o null si no se encontró.
     */
    actualizar = async (id, userId, cambios) => {
        const datos = await jsonDb.leer(this._COLECCION);
        const indice = datos.findIndex(item => item.id == id && item.userId == userId);
        if (indice === -1) return null;
        datos[indice] = { ...datos[indice], ...cambios, updatedAt: new Date().toISOString() };
        await jsonDb.guardar(this._COLECCION, datos);
        return datos[indice];
    };

    /**
     * Elimina un item de la watchlist.
     * @async
     * @param {number|string} id - ID del item a eliminar.
     * @param {number|string} userId - ID del usuario propietario del item.
     * @returns {Promise<boolean|null>} True si se eliminó, null si no se encontró.
     */
    eliminar = async (id, userId) => {
        const datos = await jsonDb.leer(this._COLECCION);
        const indice = datos.findIndex(item => item.id == id && item.userId == userId);
        if (indice === -1) return null;
        datos.splice(indice, 1);
        await jsonDb.guardar(this._COLECCION, datos);
        return true;
    };
}

export default new WatchlistRepository();
