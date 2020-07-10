const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Film = new Schema({
    title: {
        type: String,
        required: true
    }, 
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Films = mongoose.model('Film', Film);

module.exports = Films;