(function(){

    var
        $body,

        $devices,

        $iframe,

        $input,

        $page,

        $urlPanel,

        $rulers,

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
            $rulers.width( dimensions[0] / 2 );
            $devices.removeClass( 'selected' );

            $el.addClass( 'selected' );

        };

    $body = $( 'body' );
    $page = $( '.page-content' ).addClass( 'fx' );
    $iframe = $page.find( 'iframe' );
    $rulers = $( '.ruler-left, .ruler-right');
    $devices  = $( '.device' ).on( 'click', setResponsive );

    $input = $('.url', $body ).on( 'submit', 'form', setFrame ).find( 'input' );

    $devices.filter( '.auto' ).trigger( 'click' ).end();

    return {};
})();