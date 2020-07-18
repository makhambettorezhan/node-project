const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tracksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    }
});

const albumSchema = new Schema({
  
    title: {
        type: String,
        requred: true
    },
    cover: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    tracks: [tracksSchema]
}, {
    timestamps: true
});

const Albums = mongoose.model('Album', albumSchema);

module.exports = Albums;