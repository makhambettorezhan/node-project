var unirest = require("unirest");

var req = unirest("GET", "https://deezerdevs-deezer.p.rapidapi.com/search");

const search = (title, callback) => {
	req.query({
		"q": title
	});

	req.headers({
		"x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
		"x-rapidapi-key": "8ed411b6c6msh6da23a5719ea603p154f6fjsn10c332c3e72a",
		"useQueryString": true
	});


	req.end(function (res) {
		if(res.error) callback(error);
		else callback(null, res.body);
	});

};

module.exports = search;


