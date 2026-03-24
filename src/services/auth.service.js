import usuarioRepository from "../repositories/usuario.repository.js";

import { crearUsuario } from '../models/User.model.js'

class AuthService {

    /**
     * Coordina el proceso de registro de un nuevo usuario.
     * Aplica reglas de negocio: validación de duplicados, creación y limpieza de datos.
     * * @param {Object} datos - Objeto desestructurado con nombre, email y password.
     * @returns {Promise<Object>} - El usuario creado y sanitizado (sin datos sensibles).
     * @throws {Error} - Lanza un error 409 si el email ya existe.
     */
    registrarUsuario = async ({ nombre, email, password }) => {

        // Consultamos al repositorio si ya existe alguien con ese correo.
        const existe = await usuarioRepository.obtenerPorEmail(email);

        if (existe) {
            // Usamos el código 409 (Conflict): el recurso ya existe.
            const error = new Error('El correo ya está registrado.');
            error.status = 409;
            throw error; // Al lanzar el error, el 'catch' del controlador lo atrapará.
        }

        // 'crearUsuario' se encarga de estructurar el objeto (poner ID, fecha, etc.)
        // Nota: Aquí es donde normalmente se encriptaría la contraseña antes de guardar.
        const nuevoUsuario = crearUsuario({ nombre, email, password });

        // Enviamos el objeto estructurado al repositorio para que lo escriba en el JSON.
        const guardado = await usuarioRepository.guardar(nuevoUsuario);

        /**
         * Nunca debemos devolver la contraseña al cliente, ni siquiera encriptada.
         * El método '_sanitizar' se encarga de borrar los campos sensibles.
         */
        return this._sanitizar(guardado);
    }

    /**
    * Valida las credenciales de un usuario y genera un token de acceso.
    * * @param {Object} credenciales - Contiene email y password desestructurados.
    * @returns {Promise<Object>} - Un objeto con los datos del usuario (sanitizados) y su token.
    * @throws {Error} - Lanza un error 401 si el email no existe o la contraseña no coincide.
    */
    intentarLogin = async ({ email, password }) => {
        const existe = await usuarioRepository.obtenerPorEmail(email);

        /**
         * IMPORTANTE: Usamos el mismo mensaje de error ("Credenciales incorrectas") 
         * tanto si el usuario no existe como si la contraseña es mal. 
         * Esto evita que un atacante sepa qué correos están registrados.
         */
        if (!existe) {
            const error = new Error('Credenciales incorrectas.');
            error.status = 401; // Unauthorized
            throw error;
        }

        // NOTA: En producción, aquí usaríamos 'bcrypt.compare' 
        // para comparar el hash guardado con la contraseña recibida.
        const coincide = existe.password === password;

        if (!coincide) {
            const err = new Error('Credenciales incorrectas.');
            err.status = 401;
            throw err;
        }

        // El token es la "llave" que el cliente usará en futuras peticiones.
        const token = this._generarToken(existe);

        // Devolvemos el usuario limpio (sin password) y el token generado.
        return {
            user: this._sanitizar(existe),
            token
        };
    }

    _generarToken = ({ id, email, rol }) => `${id}|${email}|${rol}`;

    /**
    * Limpia el objeto de usuario eliminando información sensible antes de enviarlo al cliente.
    * Utiliza desestructuración y el operador 'rest' para una manipulación segura.
    * * @param {Object} usuario - El objeto completo del usuario extraído de la base de datos.
    * @returns {Object} - Un nuevo objeto que contiene todas las propiedades excepto la contraseña.
    */
    _sanitizar = (usuario) => {
        /**
         * - Extraemos 'password' en una variable independiente.
         * - El resto de las propiedades (id, nombre, email, etc.) se agrupan en 'resto'.
         */
        const { password, ...resto } = usuario;

        /**
         * Devolvemos únicamente el objeto 'resto'. 
         * De esta forma, la contraseña queda "atrapada" en el ámbito local de esta función 
         * y nunca viaja por la red.
         */
        return resto;
    }
}



const authService = new AuthService();

export default authService;