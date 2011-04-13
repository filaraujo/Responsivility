/**
 * Module dependencies.
 */
var express = require('express'),
		app = module.exports = express.createServer(),
		sys = require('sys'),
		ua = require('useragent');

// Configuration

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.cookieParser());
	app.use(express.session({ secret: "keyboard cat" }))
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
	app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res) {
	res.render('index', {
		title: 'Express'
	});
});

app.get('/track', function(req, res) {
	var agent,
			client,
			reqAgent = req.headers['user-agent'];

	agent = ua.parser(reqAgent);
	client = {
		is : ua.browser(reqAgent),
		parser : agent,
		browser : agent.pretty(),
		os : agent.prettyOs()
	};

	console.log(req.session);

	console.log(client.browser);

	res.send({ user : req.cookies['connect.sid']}, 202);

//	res.writeHead(202, {
//
//	});

});


// Only listen on $ node app.js

if (!module.parent) {
	app.listen(80);
	console.log("Express server listening on port %d", app.address().port);
}
