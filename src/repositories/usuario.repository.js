import jsonDb from "../db/jsonDb.js";

class UsuarioRepository {
    constructor() {
        this._coleccion = 'usuarios';
    }

    /**
    * Busca un usuario específico dentro de la colección utilizando su correo electrónico.
    * Implementa normalización de texto para evitar errores por mayúsculas/minúsculas.
    * * @param {string} email - El correo electrónico a buscar.
    * @returns {Promise<Object|null>} - El objeto del usuario si se encuentra, de lo contrario null.
    */
    obtenerPorEmail = async (email) => {

        // Si no se proporciona un email o no es una cadena, cancelamos la búsqueda.
        if (!email || typeof email !== 'string') {
            return null;
        }
        try {
            // Usamos el operador Nullish Coalescing (??) para asegurar que siempre 
            // tengamos un arreglo, incluso si la base de datos devuelve null/undefined.
            const usuarios = await jsonDb.leer(this._coleccion) ?? [];

            // .toLowerCase() es vital: Para el sistema, "Juan@Mail.com" y "juan@mail.com" 
            // deben ser el mismo usuario.
            const emailBusqueda = email.trim().toLowerCase();

            const usuarioEncontrado = usuarios.find(u =>
                u.email && u.email.toLowerCase() === emailBusqueda
            );

            // Si .find() no encuentra nada, devuelve undefined; nosotros normalizamos a null.
            return usuarioEncontrado ?? null;

        } catch (error) {
            console.error(`Error al buscar usuario por email (${email}):`, error.message);
            return null;
        }
    }


    /**
    * Agrega un nuevo usuario a la colección y persiste los cambios en el archivo JSON.
    * * @param {Object} usuario - El objeto con la información del nuevo usuario.
    * @returns {Promise<Object|null>} - El usuario guardado o null si hubo un error.
    */
    guardar = async (usuario) => {
        // Verificamos que el objeto usuario exista y no esté vacío.
        if (!usuario || Object.keys(usuario).length === 0) {
            console.error("Error: No se puede guardar un usuario vacío.");
            return null;
        }

        try {
            // Es vital obtener el arreglo completo antes de modificarlo.
            const usuarios = await jsonDb.leer(this._coleccion) ?? [];

            // Agregamos el nuevo usuario al final de la lista existente.
            usuarios.push(usuario);

            /**
             * IMPORTANTE: Debemos pasar 'usuarios' (el arreglo completo), 
             * NO solo el objeto 'usuario' individual.
             * Si pasas solo el individuo, el archivo .json se sobrescribirá 
             * y perderás a todos los usuarios anteriores.
             */
            await jsonDb.guardar(this._coleccion, usuarios);

            return usuario;

        } catch (error) {
            console.error("Error crítico al intentar guardar el usuario:", error.message);
            return null;
        }
    }
}


const usuarioRepository = new UsuarioRepository();

export default usuarioRepository;