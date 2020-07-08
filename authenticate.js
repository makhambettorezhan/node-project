const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const config = require('./config');
const User = require('./models/users');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = (user) => {
	return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

var opts = {};

opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('access_token');
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
	console.log('JWT payload: ' + jwt_payload);
	User.findOne({ _id: jwt_payload._id }, (err, user) => {
		if(err) { 
			return done(err, false); //false because no user found
		} else if(user) {
			return done(null, user);
		} else {
			return done(null, false);
		}
	})
}));


exports.verifyUser = passport.authenticate('jwt', { session: false });
