import 'dotenv/config.js';

class EnvConfig {
    // Propiedad estática para el singleton
    static #instance = null;

    // Propiedades privadas
    #PORT;
    #databaseUri;
    #jwtSecret;
    #entorno;

    constructor() {
        if (EnvConfig.#instance) {
            throw new Error('EnvConfig is a singleton class. Use EnvConfig.getInstance() to access the instance.');
        }

        // Validar y asignar la variable de entorno
        this.#PORT = process.env.PORT || 3000;



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

        this.#entorno = process.env.NODE_ENV || 'desarrollo';


        EnvConfig.#instance = this;
    }

    // Método estático para obtener la instancia única
    static getInstance() {
        if (!EnvConfig.#instance) {
            new EnvConfig();
        }
        return EnvConfig.#instance;
    }

    // Getter para la propiedad `PORT`
    get PORT() {
        return this.#PORT;
    }


    get databaseUri() {
        return this.#databaseUri;
    }

    // Setter para la propiedad `PORT` (arroja un error)
    set PORT(value) {
        throw new Error('Cannot modify the value of PORT. It is a read-only property.');
    }

    set jwtSecret(value) {
        throw new Error('Cannot modify the value of JWT_SECRET. It is a read-only property.');
    }

    get jwtSecret() {
        return this.#jwtSecret;
    }

    get entorno() {
        return this.#entorno;
    }

    set entorno(value) {
        throw new Error("No puedes modificar la variable NODE_ENV");
    }
}

const envConfig = new EnvConfig();

export default envConfig;


