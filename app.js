const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hsb = require('hbs');
const passport = require('passport');


const config = require('./config');

const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

app.use(passport.initialize());

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(db => {
	console.log('Connected correctly to the database');
}, err => console.log(err));



app.get('/', (req, res) => {
	res.render('index.hbs', {
		pageTitle: 'Welcome to this website'
	});
});

app.use('/users', userRouter);


app.listen(PORT, () => {
	console.log('Server is up for port ' + PORT);
});