import 'dotenv/config.js';

class EnvConfig {
    // Propiedad estática para el singleton
    static #instance = null;

    // Propiedades privadas
    #puerto;
    #databaseUri;
    #jwtSecret;

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


        const secret = process.env.JWT_SECRET;

        if (secret.trim() == '')
            throw new Error("No se logro cargar la variable de entorno JWT_SECRET");

        this.#jwtSecret = secret;

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

    set jwtSecret(value) {
        throw new Error('Cannot modify the value of JWT_SECRET. It is a read-only property.');
    }

    get jwtSecret() {
        return this.#jwtSecret;
    }

}

const envConfig = new EnvConfig();

export default envConfig;


