import mongoose from "mongoose";

import envConfig from '../config/env.loader.js';

class Database {
    constructor(mongoUri) {
        this.mongoUri = mongoUri;
    }

    async conectar() {
        try {
            // Listener cuando la conexión es exitosa
            mongoose.connection.on('connected', () => {
                console.log('✓ Conectado a MongoDB exitosamente');
            });

            // Listener cuando hay un error de conexión
            mongoose.connection.on('error', (error) => {
                console.error('✗ Error de conexión a MongoDB:', error);
                process.exit(1);
            });

            // Listener cuando la conexión se desconecta
            mongoose.connection.on('disconnected', () => {
                console.log('✗ Desconectado de MongoDB');
            });

            // Listener cuando se reconecta
            mongoose.connection.on('reconnected', () => {
                console.log('✓ Reconectado a MongoDB');
            });

            await mongoose.connect(this.mongoUri);

        } catch (error) {
            console.error('Error al intentar conectar:', error);
            process.exit(1);
        }
    }

    async desconectar() {
        await mongoose.disconnect();
    }
}


const database = new Database(envConfig.databaseUri);

export default database;