

import jsonDb from "../db/jsonDb.js";

class WatchlistRepository {
    constructor() {
        this._COLECCION = "watchlist";

    }

    obtenerTodosPorUsuario = async (userId) => {
        const datos = await jsonDb.leer(this._COLECCION);
        return datos.filter(item => item.userId == userId);
    };

    buscarPorIdyUsuario = async (id, userId) => {
        const datos = await jsonDb.leer(this._COLECCION);
        return datos.find(item => item.id == id && item.userId == userId) || null;
    };

    guardar = async (item) => {
        const datos = await jsonDb.leer(this._COLECCION);
        datos.push(item);
        await jsonDb.guardar(this._COLECCION, datos);
        return item;
    };

    actualizar = async (id, userId, cambios) => {
        const datos = await jsonDb.leer(this._COLECCION);
        const indice = datos.findIndex(item => item.id == id && item.userId == userId);
        if (indice === -1) return null;
        datos[indice] = { ...datos[indice], ...cambios, updatedAt: new Date().toISOString() };
        await jsonDb.guardar(this._COLECCION, datos);
        return datos[indice];
    };

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
