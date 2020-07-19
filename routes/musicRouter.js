const express = require('express');

const bodyParser = require('body-parser');

const Albums = require('../models/albums');
const search = require('../search');
const album = require('../album');

const authenticate = require('../authenticate');

const musicRouter = express.Router();

musicRouter.use(bodyParser.json());


musicRouter.get('/', (req, res, next) => {
    res.render('albums.hbs', {
        pageTitle: 'Music albums selected by admin'
    });
});

musicRouter.get('/search', (req, res, next) => {
    search(req.query.title, (err, result) => {
        if(err) console.log(error);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(result);
    }) 
});
musicRouter.get('/show', authenticate.verifyUser, (req, res, next) => {
    Albums.find({})
    .then(albums => {
       
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(albums);
    })
    .catch(err => console.log(err));
});


musicRouter.get('/add', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.render('albums.add.hbs', {
        pageTitle: 'Add Music Albums',
        message: 'The Page Where You Can Add Various Music Albums of Your Choice'
    });
});

musicRouter.post('/add/submit', (req, res, next) => {
    album(req.body.deezerId, (err, album) => {
        var tracks_array = [];

		for(var i = 0; album.tracks.data[i]; i++) {
			tracks_array[i] = { 
				title: album.tracks.data[i].title,
				preview: album.tracks.data[i].preview,
				duration: album.tracks.data[i].duration
			}; 
		}
        
        var obj = {
            title: album.title,
            cover: album.cover_medium,
            artist: album.artist.name,
            tracks: tracks_array
        };
        
        Albums.create(obj)
        .then(album => {
            console.log('Album was added ' + album);
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(album);
        })
        .catch(err => console.log(err));
    });
    
});


musicRouter.get('/del', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Albums.deleteMany({})
    .then(resp => {
             
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => console.log(err));
});

musicRouter.get('/del/:albumId', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Albums.findByIdAndRemove(req.params.albumId)
    .then(resp => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch(err => console.log(err));
});

musicRouter.get('/show/:albumId', (req, res, next) => {
    Albums.findById( req.params.albumId )
    .then(album => {
        console.log( 'Album is ' + album );
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(album);
    })
    .catch(err => console.log(err));
});


module.exports = musicRouter;