






/**
 * Crea un nuevo objeto de usuario con los datos proporcionados.
 * @typedef {Object} UserData
 * @property {string} nombre - Nombre completo del usuario.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario (sin hash).
 * @property {string} [rol='user'] - Rol del usuario ('user' o 'admin').
 */

/**
 * Crea un nuevo usuario con un ID único, timestamps y datos normalizados.
 * @function
 * @param {UserData} datos - Datos del usuario a crear.
 * @returns {Object} Objeto de usuario con todas sus propiedades.
 * @returns {number} return.id - ID único generado con timestamp.
 * @returns {string} return.nombre - Nombre del usuario.
 * @returns {string} return.email - Email en minúsculas y sin espacios.
 * @returns {string} return.password - Contraseña del usuario.
 * @returns {string} return.rol - Rol del usuario (default: 'user').
 * @returns {string} return.createdAt - Fecha de creación en formato ISO.
 * @returns {string} return.updateAt - Fecha de última actualización en formato ISO.
 */
const crearUsuario = ({ nombre, email, password, rol = 'user' }) => ({
    id: Date.now(),
    nombre,
    email: email.toLowerCase().trim(),
    password,
    rol: rol,
    createdAt: new Date().toISOString(),
    updateAt: new Date().toISOString()
});


export { crearUsuario };