const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    films: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Film',
        required: true
    }]
}, {
    timestamps: true
});

const Favorites = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorites;