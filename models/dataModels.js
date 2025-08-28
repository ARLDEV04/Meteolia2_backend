const mongoose = require('mongoose');

const dataSchema = mongoose.Schema(
    {
        temperature: {
            type: Number,
            required: true
        },
        humidite: {
            type: Number,
            required:true
        },
        pluviometrie: {
            type: Boolean,
            required: true
        },
        vitesseVent: {
            type: Number,
            required: true
        },
        directionVent: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Data', dataSchema);