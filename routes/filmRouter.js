const express = require('express');
const authenticate = require('../authenticate');
const bodyParser = require('body-parser');

const Films = require('../models/films');

const config = require('../config');



const filmRouter = express.Router();

filmRouter.use(bodyParser.json());
//filmRouter.use(express.static(config.pathString + '/public'));

filmRouter.get('/', (req, res, next) => {
    res.render('films.hbs', {
        pageTitle: 'Films selected by admin'
    });
});

filmRouter.get('/show', authenticate.verifyUser, (req, res, next) => {
    Films.find({})
    .then(films => {
       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(films);
    })
    .catch(err => console.log(err));
});

filmRouter.get('/showPretty', authenticate.verifyUser, (req, res, next) => {
    Films.find({})
    .then(films => {
        

        var array = [];
        for(var i = 0; films[i]; i++) {
            array[i] = { 
                title: films[i].title,
                year: films[i].year,
                genre: films[i].genre,
                poster: films[i].poster
            };
        }
        
        var titles = array.map(item => item['title']);
        var years = array.map(item => item['year']);
        var genres = array.map(item => item['genre'] + ';');
        var posters = array.map(item => item['poster']);

        

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.render('films.show.hbs', {
            pageTitle: "Here's the Movie List, " + req.user.username,
            titles,
            years,
            genres,
            posters
        });
    })
    .catch(err => console.log(err));
});


filmRouter.get('/add', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.render('films.add.hbs', {
        pageTitle: 'Add Films',
        message: 'The Page Where You Can Add Various Films of Your Choice'
    });
});

filmRouter.post('/add/submit', (req, res, next) => {
    Films.create(req.body)
    .then(film => {
        console.log('Film was added ' + film);
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(film);
    })
    .catch(err => console.log(err));
});

filmRouter.get('/del', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Films.deleteMany({})
    .then(resp => {
             
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => console.log(err));
});

filmRouter.get('/del/:filmId', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Films.findByIdAndRemove(req.params.filmId)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => console.log(err));
});

filmRouter.get('/show/:filmId', (req, res, next) => {
    Films.findById( req.params.filmId )
    .then(film => {
        console.log( 'Film is ' + film );
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(film);
    })
    .catch(err => console.log(err));
});
module.exports = filmRouter;