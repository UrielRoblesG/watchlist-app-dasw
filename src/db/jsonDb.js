

import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const DATA_DIR = path.join(__dirname, '..', '..', 'data');


class JsonDB {
    /**
 * Lee el contenido de un archivo JSON y lo convierte en un arreglo de objetos.
 * Si el archivo no existe, lo crea vacío.
 * * @param {string} coleccion - El nombre de la entidad a leer (ej. 'usuarios', 'watchlist').
 * @returns {Promise<Array>} - Una promesa que resuelve al contenido del archivo como un Arreglo.
 */
    leer = async (coleccion) => {
        // VALIDACIÓN DE ENTRADA: Asegurarnos de que nos pasen un nombre de colección válido.
        if (!coleccion || typeof coleccion !== 'string') {
            console.error("Error: Se requiere un nombre de colección válido.");
            return [];
        }

        // Construimos la ruta absoluta al archivo
        const file = path.join(DATA_DIR, `${coleccion}.json`);

        try {
            // Si el archivo no existe, lo inicializamos con un arreglo vacío '[]'
            if (!existsSync(file)) {
                console.log(`Archivo ${coleccion}.json no encontrado. Creando uno nuevo...`);
                await writeFile(file, '[]', 'utf-8');
                return []; // Retornamos vacío de inmediato ya que acabamos de crearlo
            }

            const raw = await readFile(file, 'utf-8');

            // Si el archivo está vacío por accidente (0 bytes), JSON.parse fallará.
            if (!raw.trim()) {
                return [];
            }

            return JSON.parse(raw);

        } catch (error) {
            /**
             * Atrapamos errores de sintaxis JSON (si alguien editó el archivo a mano y lo rompió)
             * o errores de permisos de lectura.
             */
            console.error(`Error crítico al leer la colección "${coleccion}":`, error.message);
            // En lugar de detener el servidor, devolvemos un arreglo vacío para que la app siga corriendo.
            return [];
        }
    }

    /**
  * Guarda un arreglo de datos en un archivo JSON específico.
  * Convierte el objeto de JavaScript a una cadena de texto (String) formateada.
  * * @param {string} coleccion - Nombre del archivo (sin extensión) donde se guardará.
  * @param {Array|Object} data - La información que deseamos persistir.
  * @returns {Promise<boolean>} - Devuelve true si guardó con éxito, false si hubo error.
  */
    guardar = async (coleccion, data) => {
        // CONSTRUCCIÓN DE RUTA
        const file = path.join(DATA_DIR, `${coleccion}.json`);

        // Si el archivo no existe, lo inicializamos 
        try {
            if (!existsSync(file)) {
                // Creamos el archivo con un arreglo vacío stringificado
                await writeFile(file, JSON.stringify([], null, 2), 'utf-8');
                console.log(`Archivo "${coleccion}.json" no existía. Se ha creado uno nuevo.`);
            }
        } catch (err) {
            console.error(`Error al intentar inicializar el archivo "${coleccion}":`, err.message);
            return false;
        }
        // -----------------------------------------------------------------

        // Verificamos que 'data' no sea null o undefined antes de intentar guardarlo.
        if (data === undefined || data === null) {
            console.error(`Error: No se puede guardar datos nulos en "${coleccion}"`);
            return false;
        }

        try {
            /**
             * Transformamos el Arreglo/Objeto en Texto.
             * - null: No usamos una función transformadora.
             * - 2: Agregamos una indentación de 2 espacios para que el .json sea legible por humanos.
             */
            const stringData = JSON.stringify(data, null, 2);

            await writeFile(file, stringData, 'utf-8');

            return true;

        } catch (error) {
            /**
             * Puede fallar por falta de espacio en disco, falta de permisos de escritura
             * o si la ruta del directorio no existe.
             */
            console.error(`Error crítico al escribir en "${coleccion}":`, error.message);
            return false;
        }
    }
}

const jsonDb = new JsonDB();

export default jsonDb;