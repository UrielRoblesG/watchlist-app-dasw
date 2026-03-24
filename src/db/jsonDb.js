

import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const DATA_DIR = path.join(__dirname, '..', '..', 'data');


class JsonDB {
    leer = async (coleccion) => {
        const file = path.join(DATA_DIR, `${coleccion}.json`);

        if (!existsSync(file))
            await writeFile(file, '[]', 'utf-8');

        try {
            const raw = await readFile(file, 'utf-8');
            return JSON.parse(raw);
        } catch (error) {

            return [];
        }
    }

    guardar = async (coleccion, data) => {
        const file = path.join(DATA_DIR, `${coleccion}.json`);

        try {
            await writeFile(file, JSON.stringify(data, null, 2), 'utf-8');
        } catch (error) {
            console.error(error);
        }
    }
}

const jsonDb = new JsonDB();

export default jsonDb;