const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
var logger = require('morgan');


const config = require('./config');

const userRouter = require('./routes/userRouter');
const filmRouter = require('./routes/filmRouter');
const favoriteRouter = require('./routes/favoriteRouter');

const PORT = process.env.PORT || 3000;

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');



app.use(express.static(__dirname + '/public'))

app.use(passport.initialize());

const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

connect.then(db => {
	console.log('Connected correctly to the database');
}, err => console.log(err));



app.get('/', (req, res) => {
	res.render('index.hbs', {
		pageTitle: 'Welcome to this website'
	});
});

app.use('/users', userRouter);
app.use('/films', filmRouter);
app.use('/favorites', favoriteRouter);

app.listen(PORT, () => {
	console.log('Server is up for port ' + PORT);
});