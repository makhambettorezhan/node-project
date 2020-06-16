const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
	firstname: {
		type: String
		//required: true
	},
	lastname: {
		type: String
		//required: true,
	},
	admin: {
		type: Boolean
	}
}, {
	timestamps: true
});

User.plugin(passportLocalMongoose);
const Users = mongoose.model('User', User);

module.exports = Users;