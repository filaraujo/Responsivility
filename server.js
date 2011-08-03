
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    request = require('request');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/json', function(req, res){

    request({
            url : 'http://xfinitytv.comcast.net/vodservice/rest/tv/rovi/grid/2792C/1312369200000/1312380000000.json?tz=US/Eastern&cellWidth=133&rowSteps=100000&hideDescription=true&hideImageUrl=true&version=2'
        },
        function (error, response, body) {
            res.contentType('application/json');
            res.send(JSON.stringify(fix(body)));
        }
    );
});

app.get('/json2', function(req, res){
    request({
            url : 'http://xfinitytv.comcast.net/vodservice/rest/tv/rovi/grid/2792C/1312369200000/1312380000000.json?tz=US/Eastern&cellWidth=133&rowSteps=100000&hideDescription=true&hideImageUrl=true&version=2'
        },
        function (error, response, body) {
            res.contentType('application/json');
            res.send(JSON.stringify(fix(body), null, 4));
        }
    );
});


function fix(data){
    var
        json = JSON.parse(data),
        channels = json.channels,
        listings,
        listing,
        featureList,
        features = 'adult,cc,finale,hdtv,live,fresh,kids,movie,premier,sap,subtitled,sports,stereo,widescreen'.split(','),
        feature,
        i,
        j,
        k;

        channels.shift();

        for(i = channels.length; i--;){
            channel = channels[i];
            listings = channel.tvListings;

            for(j = listings.length; j--;){
                listing = listings[j];
                featureList = [];

                for(k = features.length; k--;){
                    feature = features[k];
                    if(listing[feature]){
                        featureList.push(feature);
                    }
                    delete listing[feature];
                }
                listing.feature = featureList;

                channel.localTimeZone = listing['localTimeZone'];

                delete listing['localTimeZone'];
                delete listing['utcStartTimeInMillis'];
                delete listing['utcEndTimeInMillis'];
                delete listing['localEndTime'];
                delete listing['localStartTime'];
            }
        }

    return json;
}

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
