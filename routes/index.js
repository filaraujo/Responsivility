var rulerWidth = 6000,
    interval = 50,
    ruleCount = rulerWidth / 2 / interval,
    rules = [],
    devices = [
        { 'name': 'Full Screen', id: 'auto', dimensions: ['100%','100%'] },
        { 'name': 'Desktop', id: 'desktop', dimensions: [1200, 800] },
        { 'name': 'Tablet Landscape', id: 'tablet-landscape', dimensions: [1024, 768] },
        { 'name': 'Tablet Portrait', id: 'tablet-portrait', dimensions: [768, 1024] },
        { 'name': 'Small Tablet Landscape', id: 'small-tablet-landscape', dimensions: [640, 460]  },
        { 'name': 'Small Tablet Portrait', id: 'small-tablet-portrait', dimensions: [460, 640]  },
        { 'name': 'Mobile Landscape', id: 'mobile-landscape', dimensions: [480, 320] },
        { 'name': 'Mobile Portrait', id:'mobile-portrait', dimensions: [320, 480] }
    ];

for( ruleCount; ruleCount--; ){
    rules.push( ruleCount * interval );
}

devices.map( function( device ){
    device.position = [ 0, device.dimensions[0]/2 ];
});

rules = rules.reverse();

exports.index = function(req, res){
    var site = req.query.q || '';

    if(site && !/^http:\/\//.test(site)){
        site = 'http://' + site;
    }

    res.render('index', {
        layout: 'layouts/app.jade',
        title: 'Responsivility',
        rules: rules,
        devices: devices,
        site: site || 'http://www.bostonglobe.com'
    });
};

exports.about = function(req, res){
    res.render('about', {
        title: 'Responsivility About',
        layout: 'layouts/base.jade'
    });
};