Responsivility = (function(){
    var events = [],

        event = function( event, type ){
            return events[event] || (events[event] = jQuery.Callbacks( type ));
        };

    return {
        event: event
    };
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

            $iframes = $iframes.add( iframe );
            $content.prepend( iframe );

            event( 'setUrl' ).fire( $input.val(), iframe );
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

        setFrame = function( url ){

            if(url && !/^http:\/\//.test(url)){
                url = 'http://' + url;
            }


            $iframes.find( 'iframe' ).attr( 'src', ( !!url ) ? url : '/about' );
        },

        setUrl = function( url ){

            history.pushState(null,'Responsivility', '?q='+url);
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

        },

        showMask = function(){
            $( this ).parent().toggleClass( 'mask' );
        };

    // define events
    event( 'lockFrame' ).add( lockFrame );
    event( 'removeFrame' ).add( removeFrame );
    event( 'resetUrl' ).add( resetFrame );
    event( 'setDeviceResolution' ).add( setResponsive );
    event( 'setUrl' ).add( setFrame, setUrl );
    event( 'showMask' ).add( showMask );

    $body = $( 'body' );

    $frameTmpl = $( '#iframeTmpl' );

    $page = $( '.page' )
        .on( 'click', '.icon-th-list', openDevices )
        .on( 'click', '.icon-plus-sign', addFrame )
        .on( 'click', '.icon-refresh', event( 'resetUrl' ).fire )
        .on( 'click', '.icon-pushpin', event( 'lockFrame' ).fire )
        .on( 'click', '.icon-trash', event( 'removeFrame' ).fire )
        .on( 'click', '.icon-adjust', event( 'showMask' ).fire );

    $content = $page.find( '.page-content');

    $iframes  = $content.find( '.page-iframe' );

    $devices  = $( '.page-devices li' ).on( 'click', event( 'setDeviceResolution' ).fire );

    $input = $('.url', $body ).on( 'submit', 'form', function( e ){
        event( 'setUrl' ).fire( $input.val() );
        e.preventDefault();
        e.stopPropagation();
        return false;
    } ).find( 'input' );

    init();

    return {};
})();

Responsivility.event( 'setDeviceResolution' ).add( function(){
    _gaq.push(['_trackEvent','Devices', 'setResolution', $( this ).data('name')]);
});