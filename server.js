/**
 * Module dependencies.
 */

var express = require( 'express' )
    , routes = require( './routes' )
    , stylus = require( 'stylus' )
    , nib = require( 'nib' )
    , compile = function(str, path) {
        return stylus(str)
            .set('filename', path)
            .set('compress', true)
            .use(nib());
    };

var app = module.exports = express.createServer();

// Configuration
app.configure( function() {
    app.set( 'views', __dirname + '/views' );
    app.set( 'view engine', 'jade' );
    app.set('view options', { pretty: true });
    app.use( express.bodyParser() );
//    app.use( express.logger() );
    app.use( express.methodOverride() );
    app.use( app.router );
    app.use(
        stylus.middleware( {
            src: __dirname + '/public',
            dest: __dirname + '/public',
            compile: compile
        } )
    );
    app.use( express.static( __dirname + '/public' ) );
} );

app.configure( 'development', function() {
    app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.configure( 'production', function() {
    app.use( express.errorHandler() );
} );

// Routes
app.get( '/', routes.index );
//app.get( '/about', routes.about );
app.get( '/:site', routes.index );


app.listen((app.settings.env === 'production') ? 80 : 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
