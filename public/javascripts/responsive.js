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

        $about,

        $body,

        $devices,

        dimensions,

        $drag,

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

            var $el = $( this );

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

        },

        showAbout = function(){
            $page.toggleClass( 'flip' );
            $about.attr( 'src', '/about');
        };

    // define events
    event( 'setDeviceResolution' ).add( setResponsive );
    event( 'setUrl' ).add( setFrame, setUrl );

    $body = $( 'body' );
    $page = $( '.page-content' );
    $about = $page.find( '.page-content-about iframe' );
    $iframe = $page.find( '.page-content-iframe iframe' );
    $marker = $( '.ruler-marker' );
    $devices  = $( '.device' ).on( 'click', event( 'setDeviceResolution' ).fire );
    $input = $('.url', $body ).on( 'submit', 'form', function(){
        event( 'setUrl' ).add( setFrame ).fire();
        return false;
    } ).find( 'input' );

    $( '.help' ).on( 'click', showAbout );
//
//    var drag = function( e ){
//            var pos = e.clientX,
//                delta;
//
//            delta = startPos - pos;
//            $page.width( width + -delta );
//            console.log(delta);
//        },
//        width;
//    var startPos,
//        dragging = false;
//
//    $drag = $( '.drag-left, .drag-right' ).on( 'dragstart' ,function( event ){
//        startPos  = event.clientX;
//        width = $page.width();
//        $page.removeClass('fx');
//        $(window ).on('mousemove', drag);
//    } ).on( 'dragstop', function( e ){
//        $(window ).off('mousemove', drag);
//        $page.addClass('fx');
//    } );

    init();

    return {};
})();

Responsivility.event( 'setDeviceResolution' ).add( function(){
    _gaq.push(['_trackEvent','Devices', 'setResolution', $( this ).data('name')]);
});