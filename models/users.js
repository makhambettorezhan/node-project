const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
	firstname: {
		type: String
	},
	lastname: {
		type: String,
	},
	admin: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

User.plugin(passportLocalMongoose);
const Users = mongoose.model('User', User);

module.exports = Users;