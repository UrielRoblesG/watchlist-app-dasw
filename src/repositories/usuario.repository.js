import mongoose from "mongoose";
import { Usuario } from "../models/User.model.js";

class UsuarioRepository {

    /**
     * Obtiene todos los usuarios de la base de datos.
     * @returns {Promise<Array<Usuario>>} - Lista de todos los usuarios.
     */
    obtenerTodos = async () => {
        try {
            return await Usuario.find().populate('rol').sort({ createdAt: -1 });
        } catch (error) {
            console.error("Error al obtener todos los usuarios:", error.message);
            throw error;
        }
    }

    /**
     * Busca un usuario por su ID.
     * @param {string} id - El ID del usuario a buscar.
     * @returns {Promise<Object|null>} - El usuario encontrado o null.
     */
    obtenerPorId = async (id) => {
        if (!id) return null;
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            return await Usuario.findById(id).populate('rol');
        } catch (error) {
            console.error(`Error al buscar usuario por id (${id}):`, error.message);
            throw error;
        }
    }

    /**
     * Busca un usuario por su email.
     * @param {string} email - El email del usuario a buscar.
     * @returns {Promise<Object|null>} - El usuario encontrado o null.
     */
    obtenerPorEmail = async (email) => {
        if (!email) return null;
        try {
            return await Usuario.findOne({ email: email.toLowerCase() }).populate('rol');
        } catch (error) {
            console.error(`Error al buscar usuario por email (${email}):`, error.message);
            throw error;
        }
    }

    /**
     * Guarda un nuevo usuario en la base de datos.
     * @param {Object} usuarioData - El objeto con los datos del nuevo usuario.
     * @returns {Promise<Object>} - El usuario guardado.
     * @throws {Error} - Si hay errores de validación o base de datos.
     */
    crear = async (usuarioData) => {
        try {
            const nuevoUsuario = new Usuario(usuarioData);
            const usuarioGuardado = await nuevoUsuario.save();
            return await usuarioGuardado.populate('rol');
        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            throw error;
        }
    }

    /**
     * Actualiza un usuario existente.
     * @param {string} id - El ID del usuario a actualizar.
     * @param {Object} datosActualizar - Los datos a actualizar.
     * @returns {Promise<Object>} - El usuario actualizado.
     * @throws {Error} - Si hay errores de validación o base de datos.
     */
    actualizar = async (id, datosActualizar) => {
        try {
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("ID de usuario inválido");
            }

            const usuarioActualizado = await Usuario.findByIdAndUpdate(
                id,
                datosActualizar,
                { new: true, runValidators: true }
            ).populate('rol');

            if (!usuarioActualizado) {
                throw new Error("Usuario no encontrado");
            }

            return usuarioActualizado;

        } catch (error) {
            console.error("Error al actualizar usuario:", error.message);
            throw error;
        }
    }

    /**
     * Elimina un usuario por su ID.
     * @param {string} id - El ID del usuario a eliminar.
     * @returns {Promise<Object>} - El usuario eliminado.
     * @throws {Error} - Si hay errores en la operación.
     */
    eliminar = async (id) => {
        try {
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                throw new Error("ID de usuario inválido");
            }

            const usuarioEliminado = await Usuario.findByIdAndDelete(id);

            if (!usuarioEliminado) {
                throw new Error("Usuario no encontrado");
            }

            return usuarioEliminado;

        } catch (error) {
            console.error("Error al eliminar usuario:", error.message);
            throw error;
        }
    }

    /**
     * Busca usuarios con criterios personalizados.
     * @param {Object} criterios - Objeto con criterios de búsqueda.
     * @returns {Promise<Array<Object>>} - Array de usuarios encontrados.
     */
    buscarPor = async (criterios) => {
        try {
            return await Usuario.find(criterios).populate('rol').sort({ createdAt: -1 });
        } catch (error) {
            console.error("Error al buscar usuarios:", error.message);
            throw error;
        }
    }

    /**
     * Obtiene el total de usuarios.
     * @returns {Promise<number>} - Total de usuarios en la base de datos.
     */
    obtenerTotal = async () => {
        try {
            return await Usuario.countDocuments();
        } catch (error) {
            console.error("Error al obtener total de usuarios:", error.message);
            throw error;
        }
    }
}

const usuarioRepository = new UsuarioRepository();

export default usuarioRepository;