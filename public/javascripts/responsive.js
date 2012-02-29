var Responsive = (function(){

    var
        $pageWidth,

        $devices,

        $page,

        $rulers,

        responsiveCallback = $.Callbacks(),

        extractDimensions = function(){

            var $el = $( this ),
                dimensions = [];

            if ( $el.is( '.auto' ) ) {
                dimensions = [$( 'body' ).width(), $( 'body' ).height()];
            }
            else {
                dimensions = dimensions.concat( $el.data( 'dimensions' ));
            }


            responsiveCallback.fire( dimensions );
        },


        setResponsive = function( dimensions ){

            if( !dimensions ){
                return;
            }

            $page.width( dimensions[0] ).height( dimensions[1] );
            $rulers.width( dimensions[0] / 2 );

        };

    responsiveCallback.add( setResponsive )

    $page = $( '.page-content' );
    $rulers = $( '.ruler-left, .ruler-right');
    $devices = $( '.devices' ).on( 'click', '.device', extractDimensions )

    $page.addClass( 'fx' );

    return {};
})();