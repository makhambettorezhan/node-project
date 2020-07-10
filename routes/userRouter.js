const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('../config');
const User = require('../models/users');
const authenticate = require('../authenticate');

const userRouter = express.Router();

const LocalStrategy = require('passport-local');

const bodyParser = require('body-parser');

userRouter.use(bodyParser.json());
userRouter.use(express.static(config.pathString + '/public'));

userRouter.get('/', authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
	User.find({})
	.then(users => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(users);
	})
	.catch(err => console.log(err));
});


userRouter.get('/login', (req, res, next) => {
	
	res.render('login.hbs', {
		pageTitle: 'Welcome to the login page'
	});
});

userRouter.get('/signup', (req, res, next) => {

	res.render('signup.hbs', {
		pageTitle: 'Welcome to the signup page.',
		subheading: 'We suggest you to create your account with appropriate credentials'
	});
});

userRouter.post('/signup/submit', (req, res, next) => {

	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			res.statusCode = 500;
			res.setHeader('Content-Type', 'application/json');
			res.json({err: err});												
		} else {
			if(req.body.firstname) user.firstname = req.body.firstname;

			if(req.body.lastname) user.lastname = req.body.lastname;

			user.save((err, user) => {
				if(err) {
					res.statusCode = 500;
					res.setHeader('Content-Type', 'application/json');
					res.json({err: err});
					return;
				}

				passport.authenticate('local')(req, res, () => {
					res.statusCode = 200;
					res.setHeader('Content-Type', 'application/json');
					res.json({ success: true, status: 'Registration successful!' });
				});
			});
		}
	});
});


userRouter.post('/login/submit',  passport.authenticate('local'), (req, res) => {
	var token = authenticate.getToken({ _id: req.user._id });
	
	res.statusCode = 200;

	res.render('login.submit.hbs', {
		pageTitle: 'Welcome ' + req.user.username,
		token
	});
	//res.json({ success: true, token: token, status: 'You are successfully logged in!' });
	
});


userRouter.get('/logout', (req, res) => {
	if(req.query.access_token) {
		//req.session.destroy();
		res.clearCookie();
		res.redirect('/');
	} else {
		var err = new Error('You are not logged in');
		err.status = 401;
		
		res.render('logout.hbs', {
			message: 'You are not logged in.'
		});
		console.log(err); 
	}
});

module.exports = userRouter;
