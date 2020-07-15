const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Favorites = require('../models/favorites');
const Films = require('../models/films');

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());



favoriteRouter.get('/', authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorite) => {
        if(err) console.log(err);

        if(!favorite) {
            res.statusCode = 403;
            res.end("No favorites found!!");
        }
    })
    .populate('user')
    .populate('films')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => console.log(err));
});


favoriteRouter.get('/add', authenticate.verifyUser, (req, res, next) => {

    res.render('favorite.add.hbs', {
        pageTitle: 'Favorite Films Page',
        token: req.query.access_token
    });
});

favoriteRouter.get('/:filmId', authenticate.verifyUser, (req, res, next) => {
    Favorites.findById(req.params.filmId)
    .populate('user')
    .populate('films')
    .then(favorites => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorites);
    })
    .catch(err => console.log(err));
});


favoriteRouter.post('/submit', authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorite) => {
        if(err) console.log(err);
        if(!favorite) {
            Favorites.create({ user: req.user._id })
            .then(favorite => {
                favorite.films.push(req.body.filmId);
                
                favorite.save()
                .then(favorite => {
                    console.log('Favorite created ', favorite);
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                });
            })
            .catch(err => console.log(err));
        } else {

            if(favorite.films.indexOf(req.body.filmId) < 0) { 
                favorite.films.push(req.body.filmId);
            
                favorite.save()
                .then(favorite => {
                    console.log('Favorite created ', favorite);
                    
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                });
            } else {
                res.statusCode = 200;
                console.log('Favorite already added');
            }
        }
    });
});


favoriteRouter.delete('/del', authenticate.verifyUser, (req, res, next) => {
    Favorites.remove({ user: req.user._id })
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => console.log(err));
});


favoriteRouter.get('/del/:filmId', authenticate.verifyUser, (req, res, next) => {
    Favorites.findOne({ user: req.user._id }, (err, favorite) => {
        if (err) console.log(err);

        if(!favorite) {
            res.statusCode = 200;
            res.end('No favorite to delete');
        } 

        var index = favorite.films.indexOf(req.params.filmId);
        if(index > -1) {
            favorite.films.splice(index, 1);

            favorite.save()
            .then(resp => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch(err => console.log(err));
        }
    })
});


module.exports = favoriteRouter;