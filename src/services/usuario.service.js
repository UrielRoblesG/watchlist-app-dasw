import usuarioRepository from "../repositories/usuario.repository.js";

class UsuarioService {

    /**
     * Crea un nuevo usuario en el sistema.
     * Valida que el email no esté ya registrado.
     * @param {Object} datos - Objeto con nombre, email y password.
     * @returns {Promise<Object>} - Usuario creado y sanitizado.
     * @throws {Error} - Si el email ya existe (409) o hay error de validación.
     */
    crear = async ({ nombre, email, password }) => {
        try {
            // Verificar si el email ya está registrado
            const existe = await usuarioRepository.obtenerPorEmail(email);

            if (existe) {
                const error = new Error('El correo ya está registrado');
                error.status = 409;
                throw error;
            }

            // Crear el nuevo usuario
            const nuevoUsuario = {
                nombre: nombre,
                email: email,
                password: password
            };

            const usuarioGuardado = await usuarioRepository.crear(nuevoUsuario);
            return this._sanitizar(usuarioGuardado);
        } catch (error) {
            console.error("Error creando usuario:", error.message);
            throw error;
        }
    }

    /**
     * Obtiene todos los usuarios de la base de datos.
     * @returns {Promise<Array<Object>>} - Lista de usuarios sanitizados.
     * @throws {Error} - Si hay error en la base de datos.
     */
    obtenerTodos = async () => {
        try {
            const usuarios = await usuarioRepository.obtenerTodos();
            return usuarios.map(usuario => this._sanitizar(usuario));
        } catch (error) {
            console.error("Error obteniendo usuarios:", error.message);
            throw error;
        }
    }

    /**
     * Obtiene un usuario por su ID.
     * @param {string} id - El ID del usuario a buscar.
     * @returns {Promise<Object>} - Usuario sanitizado.
     * @throws {Error} - Si el usuario no existe o hay error en la base de datos.
     */
    obtenerPorId = async (id) => {
        try {



            const usuario = await usuarioRepository.obtenerPorId(id);

            if (!usuario) {
                const error = new Error('Usuario no encontrado');
                error.status = 404;
                throw error;
            }

            return this._sanitizar(usuario);
        } catch (error) {
            console.error(`Error obteniendo usuario por ID (${id}):`, error.message);
            throw error;
        }
    }

    /**
     * Actualiza los datos de un usuario existente.
     * @param {string} id - El ID del usuario a actualizar.
     * @param {Object} datosActualizar - Objeto con los datos a actualizar (nombre, email).
     * @returns {Promise<Object>} - Usuario actualizado y sanitizado.
     * @throws {Error} - Si el usuario no existe o hay error de validación.
     */
    actualizar = async (id, datosActualizar) => {
        try {
            
            // Validar que al menos un campo esté presente
            if (!datosActualizar || Object.keys(datosActualizar).length === 0) {
                const error = new Error('Debe proporcionar al menos un campo a actualizar');
                error.status = 400;
                throw error;
            }

            // Permitir solo actualizar nombre y email (no password, no rol)
            const camposPermitidos = { nombre: 1, email: 1 };
            const datosLimpios = {};

            for (const [clave, valor] of Object.entries(datosActualizar)) {
                if (camposPermitidos[clave] && valor !== undefined) {
                    datosLimpios[clave] = valor;
                }
            }

            if (Object.keys(datosLimpios).length === 0) {
                const error = new Error('No se pueden actualizar los campos especificados');
                error.status = 400;
                throw error;
            }

            const usuarioActualizado = await usuarioRepository.actualizar(id, datosLimpios);
            return this._sanitizar(usuarioActualizado);
        } catch (error) {
            console.error(`Error actualizando usuario (${id}):`, error.message);
            throw error;
        }
    }

    /**
     * Elimina un usuario de la base de datos.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Promise<Object>} - Mensaje de confirmación.
     * @throws {Error} - Si el usuario no existe o hay error en la base de datos.
     */
    eliminar = async (id) => {
        try {
            const usuarioEliminado = await usuarioRepository.eliminar(id);

            return {
                mensaje: 'Usuario eliminado exitosamente',
                usuarioEliminado: this._sanitizar(usuarioEliminado)
            };
        } catch (error) {
            console.error(`Error eliminando usuario (${id}):`, error.message);
            throw error;
        }
    }

    /**
     * Obtiene el total de usuarios registrados.
     * @returns {Promise<number>} - Cantidad total de usuarios.
     */
    obtenerTotal = async () => {
        try {
            return await usuarioRepository.obtenerTotal();
        } catch (error) {
            console.error("Error obteniendo total de usuarios:", error.message);
            throw error;
        }
    }

    /**
     * Sanitiza un usuario removiendo información sensible.
     * @param {Object} usuario - El usuario completo de la base de datos.
     * @returns {Object} - Usuario con solo información pública (id, nombre, email, rol).
     */
    _sanitizar = (usuario) => {
        return {
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol?.nombre || null,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
        };
    }
}

const usuarioService = new UsuarioService();

export default usuarioService;
