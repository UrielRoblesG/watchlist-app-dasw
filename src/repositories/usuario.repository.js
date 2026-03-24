
import { CookieJar } from "jsdom";
import jsonDb from "../db/jsonDb.js";

class UsuarioRepository {
    constructor() {
        this._coleccion = 'usuarios';
    }

    obtenerPorEmail = async (email = '') => {
        const usuarios = await jsonDb.leer(this._coleccion);
        return usuarios.filter(u => u.email === email.toLocaleLowerCase()) ?? null;
    }

    guardar = async (usuario) => {
        const usuarios = await jsonDb.leer(this._coleccion);
        usuarios.push(usuario);
        await jsonDb.guardar(this._coleccion, usuario);
        return usuario;
    }
}


const usuarioRepository = new UsuarioRepository();

export default usuarioRepository;