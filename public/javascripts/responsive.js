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

        $content,

        $devices,

        $frameTmpl,

        $iframes,

        $input,

        $page,

        addFrame = function(){
            var iframe = $( $frameTmpl.render({}) ).addClass( 'mobile-portrait' );

            iframe.find( 'iframe' ).attr( 'src', $input.val() );
            $iframes = $iframes.add( iframe );
            $content.prepend( iframe );
        },

        init = function(){
            event( 'setDeviceResolution' ).fireWith(  $devices.filter( '.auto' ) );
            $page.addClass( 'fx' );
        },

        lockFrame = function( ){

            var $el = $( this ).parent();

            if( $el.is( '.locked' ) ){
                $iframes = $iframes.add( $el );
                $el.removeClass( 'locked' );
            } else {
                $iframes = $iframes.not( $el );
                $el.addClass( 'locked' );
            }

        },

        openDevices = function(){
            $( this ).toggleClass( 'active' );
            $page.toggleClass( 'devices' );
        },

        removeFrame = function(){
            $( this ).parent().remove();
        },

        resetFrame = function(){
            $( this ).siblings( 'iframe' ).attr( 'src', function ( i, val ) {
                return val;
            });
        },

        setFrame = function(){
            $iframes.find( 'iframe' ).attr( 'src', $input.val() );
            return false;
        },

        setUrl = function(){
            history.pushState({},'Responsivility','?q='+  $input.val());
        },

        setResponsive = function(){

            var $el = $( this );

            if ( $el.is( '.auto' ) ) {
                $iframes.width( $body.width() );
            }
            else {
                $iframes.removeAttr( 'style' );
            }

            $iframes.attr( 'class', 'page-iframe '+$el.attr('class') );

        };

    // define events
    event( 'setDeviceResolution' ).add( setResponsive );
    event( 'lockFrame' ).add( lockFrame );
    event( 'removeFrame' ).add( removeFrame );
    event( 'setUrl' ).add( setFrame, setUrl );
    event( 'resetUrl' ).add( resetFrame );

    $body = $( 'body' );

    $frameTmpl = $( '#iframeTmpl' );

    $page = $( '.page' )
        .on( 'click', '.icon-th-list', openDevices )
        .on( 'click', '.icon-plus', addFrame )
        .on( 'click', '.icon-refresh', event( 'resetUrl' ).fire )
        .on( 'click', '.icon-key', event( 'lockFrame' ).fire )
        .on( 'click', '.icon-trash', event( 'removeFrame' ).fire );

    $content = $page.find( '.page-content');

    $iframes  = $content.find( '.page-iframe' );

    $devices  = $( '.page-devices li' ).on( 'click', event( 'setDeviceResolution' ).fire );


    $input = $('.url', $body ).on( 'submit', 'form', function(){
        event( 'setUrl' ).fire();
        return false;
    } ).find( 'input' );

    init();

    return {};
})();

Responsivility.event( 'setDeviceResolution' ).add( function(){
    _gaq.push(['_trackEvent','Devices', 'setResolution', $( this ).data('name')]);
});