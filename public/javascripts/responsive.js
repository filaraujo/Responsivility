Responsivility = (function(){
    var events = [],

        event = function( event, type ){
            return events[event] || (events[event] = jQuery.Callbacks( type ))
        };

    return {
        event: event
    }
})();

Responsivility.app = (function(){

    var
        event = Responsivility.event,

        $body,

        $devices,

        $iframe,

        $input,

        $page,

        $marker,

        init = function(){
            $page.addClass( 'fx' );
            setResponsive.call(  $devices.filter( '.auto' ) );
        },

        setFrame = function(){
            $iframe.attr( 'src', $input.val() );
            return false;
        },

        setUrl = function(){
            history.pushState({},'Responsivility','?q='+  $input.val());
        },

        setResponsive = function(){

            var $el = $( this ),
                dimensions = [];

            if ( $el.is( '.auto' ) ) {
                dimensions = [$body.width(), $(window).height()];
            }
            else {
                dimensions = dimensions.concat( $el.data( 'dimensions' ));
            }

            $page.width( dimensions[0] ).height( dimensions[1] );
            $marker.width( dimensions[0] );
            $devices.removeClass( 'selected' );

            $el.addClass( 'selected' );

        };

    // define events
    event( 'setDeviceResolution' ).add( setResponsive );
    event( 'setUrl' ).add( setFrame, setUrl );

    $body = $( 'body' );
    $page = $( '.page-content' );
    $iframe = $page.find( 'iframe' );
    $marker = $( '.ruler-marker');
    $devices  = $( '.device' ).on( 'click', event( 'setDeviceResolution' ).fire );
    $input = $('.url', $body ).on( 'submit', 'form', function(){
        event( 'setUrl' ).add( setFrame ).fire();
        return false;
    } ).find( 'input' );

    init();

    return {};
})();




var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29773084-1']);
_gaq.push(['_trackPageview']);

Responsivility.event( 'setDeviceResolution' ).add( function(){
    _gaq.push(['_trackEvent','Devices', 'setResolution', $( this ).data('name')]);
});

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();