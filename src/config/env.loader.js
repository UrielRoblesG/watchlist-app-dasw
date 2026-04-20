import 'dotenv/config.js';

class EnvConfig {
    // Propiedad estática para el singleton
    static #instance = null;

    // Propiedades privadas
    #puerto;
    #databaseUri;

    constructor() {
        if (EnvConfig.#instance) {
            throw new Error('EnvConfig is a singleton class. Use EnvConfig.getInstance() to access the instance.');
        }

        // Validar y asignar la variable de entorno
        this.#puerto = process.env.PUERTO || 3000;



        const uri = process.env.DATABASE_URI;

        if (uri.trim() === '') {
            throw new Error("");
        }

        this.#databaseUri = uri;

        console.log(this.#databaseUri);

        EnvConfig.#instance = this;
    }

    // Método estático para obtener la instancia única
    static getInstance() {
        if (!EnvConfig.#instance) {
            new EnvConfig();
        }
        return EnvConfig.#instance;
    }

    // Getter para la propiedad `puerto`
    get puerto() {
        return this.#puerto;
    }


    get databaseUri() {
        return this.#databaseUri;
    }

    // Setter para la propiedad `puerto` (arroja un error)
    set puerto(value) {
        throw new Error('Cannot modify the value of PUERTO. It is a read-only property.');
    }
}

const envConfig = new EnvConfig();

export default envConfig;


