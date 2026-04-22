


import { genSalt, compare, hash } from "bcrypt";



const encriptar = async (cad) => {
    try {
        const salt = await genSalt(10);

        const passwordEncriptado = await hash(cad, salt);

        return passwordEncriptado;
    } catch (error) {
        throw new Error("Error al encriptar la contraseña. Error: ", error);
    }
}

const compararPassword = async (passwordEncriptado, passwordPlano) => {
    try {
        const coinciden = await compare(passwordPlano, passwordEncriptado);

        return coinciden
    } catch (error) {
        throw new Error("Erro al comparar las contraseñas. Error: ", error);
    }
}

export { encriptar, compararPassword }