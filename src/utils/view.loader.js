
import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta a la carpeta /data desde cualquier punto del proyecto
const VIEWS_DIR = path.join(__dirname, '..', '..', 'views');


class ViewLoader {

    cargar = async (vista) => {
        return path.join(VIEWS_DIR, `${vista}.html`);
    }
}


export default new ViewLoader();
