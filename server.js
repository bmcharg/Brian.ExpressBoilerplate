var express = require('express');
var app = module.exports = express();
var moment = require('moment');
var ip = require('ip');

/* Clear the console */
process.stdout.write('\033c');

/* Load configuration and package info so we have it accessible to the app */
var config = require('./config/config.json');
var package = require('./package.json');

/* Setup app variables we may need later, including a handle to the Nuimo */
app.set('environment', process.env.ENVIRONMENT || "DEV");
app.set('package', package);
app.set('config', config);
app.set('startTime',moment().format());

/* Define our routes and add them to the app */
var routes = require('./app/routes.js');
app.use(routes);

/* Add a handler for the root URL which outputs status */
app.get('/', function(req, res){


	// var launched = app.get('startTime');
	// var uptime = moment()


	res.json({

		app: {
			name: package.name,
			description: package.description,
			version: package.version
		},
		server: {
			ip: ip.address(),
			port: config.PORT,
			launched: moment(app.get('startTime')).fromNow()
		}
	});


	// res.send('Server up since ' + app.get('startTime'));
})

/* Begin listening */
app.listen(config.PORT, function(){
	console.log(package.description + " (" + package.version + ") listening on port " + config.PORT);
})