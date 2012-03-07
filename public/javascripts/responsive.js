(function(){

    var
        $body,

        $devices,

        $iframe,

        $input,

        $page,

        $mark,

        $marker,

        setFrame = function(){
            $iframe.attr( 'src', $input.val() );
            return false;
        },

        setResponsive = function( dimensions ){

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

    $body = $( 'body' );
    $page = $( '.page-content' ).addClass( 'fx' );
    $iframe = $page.find( 'iframe' );
    $marker = $( '.ruler-marker');
    $devices  = $( '.device' ).on( 'click', setResponsive );
    $input = $('.url', $body ).on( 'submit', 'form', setFrame ).find( 'input' );
    $devices.filter( '.auto' ).trigger( 'click' ).end();

//    $marker.resizable({
//        handles: 'e, w',
//        maxHeight: 7,
//        minHeight: 7,
//        minWidth: 300
//    });



    return {};
})();


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-29773084-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();