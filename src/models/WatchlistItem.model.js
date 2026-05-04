import { model, Schema, SchemaTypes } from 'mongoose';

const watchlistItemSchema = new Schema({
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'Usuario',
        required: [true, 'El ID del usuario es requerido']
    },
    titulo: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true
    },
    tipo: {
        type: String,
        enum: {
            values: ['serie', 'movie'],
            message: 'El tipo debe ser "series" o "movie"'
        },
        required: [true, 'El tipo es requerido']
    },
    genero: {
        type: String,
        required: [true, 'El género es requerido']
    },
    calificacion: {
        type: Number,
        default: 0,
        min: [0, 'La calificación no puede ser menor a 0'],
        max: [10, 'La calificación no puede ser mayor a 10']
    },
    estatus: {
        type: String,
        enum: {
            values: ['pendiente', 'visto', 'viendo'],
            message: 'El estatus debe ser "pendiente", "visto" o "viendo"'
        },
        default: 'pendiente'
    },
    coverUrl: {
        type: String,
        default: ''
    },
    notas: {
        type: String,
        default: ''
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-hook para actualizar updatedAt antes de guardar
watchlistItemSchema.pre('save', function () {
    this.updatedAt = Date.now();
});

const WatchlistItem = model('WatchlistItem', watchlistItemSchema);

export { WatchlistItem };