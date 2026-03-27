
/**
 * @typedef {Object} WatchlistItemData
 * @property {number} userId - ID del usuario propietario del item.
 * @property {string} titulo - Título del elemento (película, serie, etc.).
 * @property {string} tipo - Tipo de contenido ('pelicula', 'serie', 'libro', etc.).
 * @property {string} [genero=''] - Género del contenido.
 * @property {number|null} [rating=null] - Puntuación del 1 al 10.
 * @property {string} [estado='pendiente'] - Estado del item ('pendiente', 'en_progreso', 'completado').
 * @property {string} [coverUrl=''] - URL de la imagen de portada.
 * @property {string} [notas=''] - Notas personales del usuario.
 */

/**
 * Crea un nuevo item de watchlist con datos normalizados y timestamps.
 * @function
 * @param {WatchlistItemData} datos - Datos del item a crear.
 * @returns {Object} Objeto de item de watchlist.
 * @returns {number} return.id - ID único generado con timestamp.
 * @returns {number} return.userId - ID del usuario propietario.
 * @returns {string} return.titulo - Título normalizado (sin espacios).
 * @returns {string} return.tipo - Tipo de contenido.
 * @returns {string} return.genero - Género del contenido.
 * @returns {number|null} return.rating - Puntuación asignada.
 * @returns {string} return.estado - Estado actual del item.
 * @returns {string} return.coverUrl - URL de la portada.
 * @returns {string} return.notas - Notas del usuario.
 * @returns {string} return.createdAt - Fecha de creación en formato ISO.
 * @returns {string} return.updatedAt - Fecha de última actualización en formato ISO.
 */
const crearWatchlistItem = ({
    userId,
    titulo,
    tipo,
    genero = '',
    rating = null,
    estado = 'pendiente',
    coverUrl = '',
    notas = ''
}) => {
    return {
        id: Date.now(),
        userId: Number.parseInt(userId),
        titulo: titulo.trim(),
        tipo,
        genero,
        rating,
        estado,
        coverUrl,
        notas,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
};

export { crearWatchlistItem };