import { Usuario } from "../models/User.model.js";
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
        try {
            const usuario = await Usuario.findOne({ email: email.toLowerCase() }).populate('rol');
            return usuario ?? null;
        } catch (error) {
            throw new Error("Error al obtener usuario por email: ", email.toLowerCase());
        }
    }


    /**
    * Agrega un nuevo usuario a la colección y persiste los cambios en el archivo JSON.
    * * @param {Object} usuario - El objeto con la información del nuevo usuario.
    * @returns {Promise<Object|null>} - El usuario guardado o null si hubo un error.
    */
    guardar = async (usuario) => {
        try {
            const nuevoUsuario = new Usuario(usuario);
            const usuarioGuardado = await nuevoUsuario.save();
            return usuarioGuardado;
        } catch (error) {
            throw new Error(`Error al guardar el usuario. Error: ${error.message}`);
        }
    }

    buscarPorId = async (id) => {
        try {
            const usuario = await Usuario.findById(id);
            return usuario ?? null;
        } catch (error) {

        }
    }

    obtenerTodo = async () => {
        try {
            return await Usuario.find({});
        } catch (error) {

        }
    }
}


const usuarioRepository = new UsuarioRepository();

export default usuarioRepository;